import { Button, Input, Select, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/icons/SearchIcon";

export default function CustomersSingleSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("user_info");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/customers?searchkey=${searchKey}&searchValue=${searchValue}`);
  };

  return (
    <>
      <span className="text-oxford-blue-400 font-[500] text-[14px] pb-[5px]">
        Search by
      </span>

      <div className="flex ">
        <Space.Compact>
          <Select
            defaultValue="user_info"
            style={{ width: 180 }}
            onChange={(value) => setSearchKey(value)}
            options={[
              { value: "user_info", label: "Full name or User Code" },
              {
                value: "phone",
                label: "Phone",
              },
              { value: "user_id", label: "ID" },
              { value: "address", label: "Address" },
              {
                value: "email",
                label: "Email",
              },
              { value: "passport_details", label: "Passport details" },
            ]}
          />
          <Input
            style={{ width: 290 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSearch();
              }
            }}
          />
        </Space.Compact>
        <Button
          onClick={() => handleSearch()}
          icon={<SearchIcon />}
          className="ml-[16px]"
        >
          Search
        </Button>
      </div>
    </>
  );
}
