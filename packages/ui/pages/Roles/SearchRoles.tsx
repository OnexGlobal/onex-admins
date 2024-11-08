import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Input } from "antd";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface Props {
  setCreateRole: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchRoles: FC<Props> = ({ setCreateRole, setSearchValue }) => {
  const [val, setVal] = useState("");
  return (
    <div className="flex items-end gap-[16px] w-full mb-[16px] ">
      <div>
        <span className="text-oxford-blue-300 mb-[4px] font-[500] mr-[16px]">
          Search
        </span>

        <Input
          placeholder={"Search by role name"}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{ width: 290 }}
        />
      </div>
      <Button
        type="default"
        htmlType="reset"
        onClick={() => {
          setSearchValue("");
          setVal("");
        }}
      >
        Reset
      </Button>
      <Button
        icon={<SearchIcon />}
        htmlType="submit"
        type="primary"
        onClick={() => setSearchValue(val)}
      >
        Search
      </Button>
      <Button
        onClick={() => setCreateRole(true)}
        className="ml-auto"
        type="default"
      >
        Create role
      </Button>
    </div>
  );
};
