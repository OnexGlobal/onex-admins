import { Recipient } from "@repo/types/src/users";
import { AutoComplete, Button, Input, Select, Space } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface Props {
  searchValue: string;
  searchKey: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchKey: Dispatch<SetStateAction<string>>;
  setAdd: Dispatch<SetStateAction<boolean | Recipient["user"]>>;
  handleSearch: () => void;
  reset: () => void;
}

export default function MembersSearch({
  searchValue,
  searchKey,
  setSearchKey,
  setSearchValue,
  handleSearch,
  setAdd,
  reset,
}: Props) {
  const [user_info, setUserInfo] = useState("");
  const { recipients: usersList = [] } = useGetRecipients(
    user_info ? { user_info } : null
  );
  return (
    <div className="flex flex-col w-full mb-[16px]">
      <span className="text-[14px] text-oxford-blue-300 mb-[5px] font-[500]">
        Search by
      </span>

      <div className="flex gap-[16px]">
        <Space.Compact>
          <Select
            defaultValue="user_info"
            style={{ width: 180 }}
            onSelect={(value) => setSearchKey(value)}
          >
            <Select.Option value="user_info">
              Full name or User code
            </Select.Option>
            <Select.Option value="phone">Phone</Select.Option>
            <Select.Option value="user_id">ID</Select.Option>
            <Select.Option value="address">Address</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="passport_details">
              Passport details
            </Select.Option>
          </Select>
          {searchKey === "user_info" ? (
            <AutoComplete
              style={{ width: 290 }}
              onSearch={(val) => setUserInfo(val)}
              onSelect={(val) => setSearchValue(val)}
              options={usersList}
              value={searchValue}
            />
          ) : (
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
          )}
        </Space.Compact>
        <Button onClick={reset} type="default" htmlType="reset">
          Reset
        </Button>
        <Button icon={<SearchIcon />} onClick={() => handleSearch()}>
          Search
        </Button>
        <Button
          className="bg-oxford-blue-300 ml-auto"
          onClick={() => setAdd(true)}
        >
          Add member
        </Button>
      </div>
    </div>
  );
}
