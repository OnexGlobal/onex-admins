import { AutoComplete, Button, DatePicker, Form } from "antd";
import { useState } from "react";
import { AddPrimeUsers } from "./AddPrimeUsers";
import { PrimeUser } from "@repo/types";
import { usePrimeUsersAutocomplete } from "../../hooks/customers/usePrimeUsersAutocomplete.hook";
import dayjs from "dayjs";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { RefreshIcon } from "../../assets/icons/RefreshIcon";
import { PlusIcon } from "../../assets/icons/PlusIcon";

const { RangePicker } = DatePicker;
export default function PrimeUsersSearch({
  setFilter,
  refetch,
}: PrimeUser.PrimeUsersSearchType) {
  const [userInfo, setUserInfo] = useState({});
  const { usersList } = usePrimeUsersAutocomplete(userInfo);
  const [form] = Form.useForm();
  const [add, setAdd] = useState(false);
  const handleRefresh = () => {
    refetch();
    setFilter({});
  };
  const onFinish = ({
    date,
    user_info,
  }: {
    date?: Record<string, string | number | undefined | boolean>[];
    user_info?: string;
  }) => {
    setFilter({
      start_date: date ? dayjs(String(date[0])).format("DD-MM-YYYY") : null,
      end_date: date ? dayjs(String(date[1])).format("DD-MM-YYYY") : null,
      user_info: user_info || null,
    });
  };
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <div className="flex gap-[16px]">
          <Form.Item name={"user_info"} style={{ width: 260 }}>
            <AutoComplete
              placeholder="Full name or user code"
              onSearch={(val) => {
                setUserInfo({ user_info: val, is_prime: 1 });
              }}
              options={usersList}
            />
          </Form.Item>
          <Form.Item name={"date"}>
            <RangePicker allowClear={false} />
          </Form.Item>

          <Button type="primary" icon={<SearchIcon />} htmlType={"submit"}>
            Search
          </Button>
          <Button
            htmlType={"reset"}
            onClick={() => handleRefresh()}
            icon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </div>
        <Button
          htmlType={"reset"}
          type="primary"
          onClick={() => setAdd(true)}
          icon={<PlusIcon color={"#FFFFFF"} />}
        >
          Add Prime
        </Button>
      </Form>
      <AddPrimeUsers add={add} setAdd={setAdd} />
    </>
  );
}
