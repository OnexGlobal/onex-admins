import { AutoComplete, Button, DatePicker, Form } from "antd";
import { useState } from "react";
import { AddPrimeUsers } from "./AddPrimeUsers";
import { PrimeUser } from "@repo/types";
import { usePrimeUsersAutocomplete } from "../../hooks/customers/usePrimeUsersAutocomplete.hook";
import dayjs from "dayjs";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { RefreshIcon } from "../../assets/icons/RefreshIcon";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Loading } from "../../components/loader/Loading";

const { RangePicker } = DatePicker;
export default function PrimeUsersSearch({
  setFilter,
  refetch,
}: PrimeUser.PrimeUsersSearchType) {
  const [userInfo, setUserInfo] = useState({});
  const { usersList, isLoading } = usePrimeUsersAutocomplete({
    is_prime: 1,
    per_page: 1000,
    ...userInfo,
  });
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
          <Form.Item name={"user_info"} className="w-[260px]">
            <AutoComplete
              placeholder="Full name or GA"
              onSearch={(val) => {
                setUserInfo({ user_info: val, is_prime: 1 });
              }}
              options={
                isLoading
                  ? [
                      {
                        value: "NULL",
                        disabled: true,
                        label: (
                          <div className="flex items-center justify-center w-full h-[100px]">
                            <Loading />
                          </div>
                        ),
                      },
                    ]
                  : usersList
              }
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
