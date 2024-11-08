import { AutoComplete, Button, DatePicker, Form, Input, Select } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { useGetBonusTypeLis } from "../../hooks/bonus/useGetBonusTypeList.hook";
import dayjs from "dayjs";
import { SearchIcon } from "../../assets/icons/SearchIcon";

const { RangePicker } = DatePicker;

interface Props {
  setFilterData: Dispatch<SetStateAction<object>>;
}

export default function BonusTopActions({ setFilterData }: Props) {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<{ user_info: string } | null>(null);
  const [selectId, setSelectId] = useState<null | number>(null);
  const { recipients } = useGetRecipients(
    userInfo && userInfo?.user_info?.trim()?.length === 0 ? null : userInfo
  );
  const { bonusTypeList = [] } = useGetBonusTypeLis();
  const onFinish = (values: Record<string, string>) => {
    const newValues: { [key: string]: string | number } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        if (key === "date") {
          newValues["given_date"] = dayjs(val[0]).format("YYYY-MM-DD");
          newValues["given_date_end"] = dayjs(val[1]).format("YYYY-MM-DD");
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
    setFilterData({});
    setSelectId(null);
  };
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      className={"_paper !min-h-0"}
    >
      {" "}
      <div className="flex justify-between gap-[16px]">
        <Form.Item name={"user_id"} style={{ width: 240 }}>
          <AutoComplete
            placeholder="Full name"
            onSearch={(val) => setUserInfo({ user_info: val })}
            onSelect={(_, el) => setSelectId(el.user_id)}
            options={recipients}
          />
        </Form.Item>

        <Form.Item name={"sum"}>
          <Input placeholder="Bonus amount" type={"number"} />
        </Form.Item>

        <Form.Item name="date">
          <RangePicker
            format={"DD.MM.YYYY"}
            placeholder={["Given date from", "Given date to"]}
          />
        </Form.Item>

        <Form.Item name="bonus_type_id" style={{ width: 180 }}>
          <Select placeholder={"Bonus type"} options={bonusTypeList} />
        </Form.Item>
        <Button
          className="ml-auto"
          type="default"
          htmlType="reset"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button htmlType="submit" type="primary" icon={<SearchIcon />}>
          Search
        </Button>
      </div>
    </Form>
  );
}
