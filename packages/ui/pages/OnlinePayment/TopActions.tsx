import { AutoComplete, Button, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { SearchIcon } from "../../assets/icons/SearchIcon";

const { RangePicker } = DatePicker;

interface Props {
  setFilterData: Dispatch<SetStateAction<Record<string, string | number>>>;
}

export default function OnlinePaymentTopActions({ setFilterData }: Props) {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<null | { user_info: string }>(null);
  const [selectId, setSelectId] = useState<null | number>(null);
  const { recipients: usersList = [] } = useGetRecipients(
    userInfo && userInfo?.user_info?.trim()?.length === 0 ? null : userInfo
  );
  const onFinish = (values: object) => {
    const newValues: { [key: string]: string | number } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        if (key === "date") {
          newValues["start_date"] = dayjs(val[0]).format("YYYY-MM-DD");
          newValues["end_date"] = dayjs(val[1]).format("YYYY-MM-DD");
        } else {
          newValues[key] = val;
        }
        if (selectId) {
          newValues["user_id"] = selectId;
        }
      }
    });
    setFilterData(newValues);
  };

  const onReset = () => {
    form.resetFields();
    setSelectId(null);
    setFilterData({});
  };
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <div className="flex mb-[12px]">
        <Form.Item name={"user_id"} style={{ marginRight: 16, width: 250 }}>
          <AutoComplete
            placeholder="Name of user or RU"
            onSearch={(val) => setUserInfo({ user_info: val })}
            onSelect={(_, el) => setSelectId(el.user_id)}
            options={usersList}
          />
        </Form.Item>

        <Form.Item name="date" style={{ marginRight: 16, width: 250 }}>
          <RangePicker format={"DD.MM.YYYY"} />
        </Form.Item>
        <Button type="default" onClick={onReset} className="mr-[16px]">
          Reset
        </Button>
        <Button type="primary" htmlType="submit" icon={<SearchIcon />}>
          Search
        </Button>
      </div>
    </Form>
  );
}
