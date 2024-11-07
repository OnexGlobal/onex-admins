import { Dispatch, SetStateAction, useState } from "react";
import { AutoComplete, Button, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { UserType } from "@repo/types/src/users";
import { useBalancesTransferTypeHook } from "../../hooks/balances/useBalancesTransferType.hook";
import { useBalancesPaymentTypeHook } from "../../hooks/balances/useBalancesPaymentType.hook";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import InputIcon from "../../assets/icons/InputIcon";
import OutputIcon from "../../assets/icons/OutputIcon";

const { RangePicker } = DatePicker;

interface Props {
  setFilterData: Dispatch<SetStateAction<Record<string, string | number>>>;
  setUserInfo: Dispatch<SetStateAction<Record<string, string> | null>>;
  usersList?: UserType[];
}

export default function BalanceTopActions({
  setFilterData,
  setUserInfo,
  usersList = [],
}: Props) {
  const [form] = Form.useForm();
  const [selectId, setSelectId] = useState<null | number | string>(null);
  const { transferType = [] } = useBalancesTransferTypeHook();
  const { paymentType = [] } = useBalancesPaymentTypeHook();
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
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      className={"_paper"}
      style={{ marginBottom: 24 }}
    >
      <div className="flex space-between">
        <Form.Item name={"user_id"} style={{ width: 240, marginRight: 16 }}>
          <AutoComplete
            placeholder="Name of user or GA"
            onSearch={(val) => setUserInfo({ user_info: val })}
            onSelect={(_, el) => setSelectId(el.user_id)}
            options={usersList}
          />
        </Form.Item>

        <Form.Item name="date" style={{ width: 200, marginRight: 16 }}>
          <RangePicker format={"DD.MM.YYYY"} />
        </Form.Item>

        <Form.Item name="type" style={{ width: 130, marginRight: 16 }}>
          <Select defaultValue="">
            <Select.Option value="">
              <div className="flex">
                <InputIcon size={24} />
                <OutputIcon size={24} />
              </div>
            </Select.Option>
            <Select.Option value="in">
              <InputIcon size={"24"} margin={"0 0 -7px 0"} />
            </Select.Option>
            <Select.Option value="out">
              <OutputIcon size={"24"} margin={"0 0 -7px 0"} />
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="payment_type_id"
          style={{ width: 180, marginRight: 16 }}
        >
          <Select placeholder={"Payment type"} options={paymentType} />
        </Form.Item>

        <Form.Item
          name="transfer_type_id"
          style={{ width: 200, marginRight: "auto" }}
        >
          <Select placeholder={"Transfer type"} options={transferType} />
        </Form.Item>

        <div className="flex gap-[12px]">
          <Button onClick={onReset} type="default" htmlType="reset">
            Reset
          </Button>
          <Button htmlType="submit" type="primary" icon={<SearchIcon />}>
            Search
          </Button>
        </div>
      </div>
    </Form>
  );
}
