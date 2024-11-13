import { DatePicker, Form } from "antd";
import { OrderData } from "@repo/types/src/orders";

interface Props {
  order: OrderData;
}

export default function Times({ order }: Props) {
  return (
    <div className="flex justify-between gap-[16px] rounded-[12px] bg-white p-[16px] mb-[16px] h-max w-[100%]">
      {order?.expected ? (
        <Form.Item
          name={"expected_date"}
          className="w-[100%]"
          label={"Expected"}
        >
          <DatePicker className="w-[100%]" inputReadOnly={true} />
        </Form.Item>
      ) : null}

      <Form.Item
        label={"At Warehouse"}
        className="w-[100%]"
        name={"at_warehouse_date"}
      >
        <DatePicker className="w-[100%]" inputReadOnly={true} />
      </Form.Item>

      <Form.Item name={"on_way_date"} className="w-[100%]" label={"On the Way"}>
        <DatePicker className="w-[100%]" inputReadOnly={true} />
      </Form.Item>

      <Form.Item
        name={"in_georgia_date"}
        className="w-[100%]"
        label={"In Georgia"}
      >
        <DatePicker className="w-[100%]" inputReadOnly={true} />
      </Form.Item>

      <Form.Item name={"received_date"} className="w-[100%]" label={"Received"}>
        <DatePicker className="w-[100%]" inputReadOnly={true} />
      </Form.Item>
    </div>
  );
}
