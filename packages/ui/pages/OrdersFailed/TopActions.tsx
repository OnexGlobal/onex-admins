import { Button, Form, Input, Select } from "antd";
import { SearchIcon } from "@repo/ui/assets/icons/SearchIcon";
import { orderStatusOptions } from "@repo/ui/constants/order-status-texts";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setFilters: Dispatch<SetStateAction<Record<string, string | number>>>;
}

export default function OrdersFailedTopActions({ setFilters }: Props) {
  const handleFinish = (values: Record<string, string | number>) => {
    setFilters(values);
  };

  const handleResetForm = () => {
    setFilters({});
  };

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <div className="flex gap-[16px]">
        <Form.Item
          className="w-[300px]"
          name="tracking_code"
          rules={[
            { min: 7, message: "Username must be minimum 7 characters." },
          ]}
        >
          <Input placeholder={"Tracking code"} />
        </Form.Item>

        <Form.Item name="order_status" className="w-[250px]">
          <Select placeholder={"Order Status"} options={orderStatusOptions} />
        </Form.Item>

        <Button
          type={"default"}
          htmlType={"reset"}
          onClick={() => handleResetForm()}
        >
          Reset
        </Button>
        <Button type="primary" htmlType="submit" icon={<SearchIcon />}>
          Search
        </Button>
      </div>
    </Form>
  );
}
