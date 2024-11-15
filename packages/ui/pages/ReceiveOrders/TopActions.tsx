import { Dispatch, SetStateAction, useState } from "react";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import { AutoComplete, Button, Select, Space } from "antd";
import { SearchIcon } from "@repo/ui/assets/icons/SearchIcon";
import { Recipient } from "@repo/types/src/prime-users-type";

interface Props {
  setFilters: Dispatch<Record<string, string | number | boolean | undefined>>;
  setUser: Dispatch<SetStateAction<null | Recipient>>;
  loading: boolean;
}

export default function ReceiveTopActions({
  setFilters,
  setUser,
  loading,
}: Props) {
  const [searchKey, setSearchKey] = useState("user_info");
  const [userInfo, setUserInfo] = useState<null | Record<string, string>>(null);
  const [selected, setSelected] = useState<Recipient | null>(null);
  const { recipients: usersList = [] } = useGetRecipients(userInfo) as {
    recipients: Recipient[];
  };

  const handleSearch = () => {
    setUser(selected);
    setFilters({
      recipient_id: selected?.id,
      ready_for_pickup: 1,
      order_status: "in_georgia",
    });
  };
  return (
    <div className="flex gap-[16px] items-end">
      <div>
        <h1 className="text-info text-oxford-blue-400 font-[500]">Search by</h1>
        <Space.Compact>
          <Select
            defaultValue="user_info"
            className="w-[250px]"
            onSelect={(value) => setSearchKey(value)}
          >
            <Select.Option value="user_info">
              Full name or user code
            </Select.Option>
            <Select.Option value="phone">Phone</Select.Option>
            <Select.Option value="user_id">ID</Select.Option>
            <Select.Option value="address">Address</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="passport_details">
              Passport details
            </Select.Option>
          </Select>

          <AutoComplete
            className="w-[240px]"
            placeholder="Search"
            onSearch={(val) => setUserInfo(val ? { [searchKey]: val } : null)}
            onSelect={(_, val: Recipient) => {
              setSelected(val);
              setUser(null);
              setFilters({});
            }}
            options={usersList}
          />
        </Space.Compact>
      </div>
      <Button
        loading={loading}
        disabled={loading || !searchKey}
        type="primary"
        icon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
