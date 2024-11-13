import { Form, Input } from "antd";

export default function Costs() {
  return (
    <div className="flex rounded-[12px] bg-white p-[16px] mb-[16px] h-max gap-[16px]">
      <Form.Item
        name={"additional_cost"}
        label={"Add. cost"}
        className="w-[160px]"
      >
        <Input value="0.4" suffix="$" />
      </Form.Item>

      <Form.Item
        name={"charge_cost"}
        label={"Add. charge cost"}
        className="w-[160px]"
      >
        <Input value="0.4" suffix="$" />
      </Form.Item>
      <Form.Item name={"ups_cost"} label={"UPS cost"} className="w-[160px]">
        <Input value="0.4" suffix="$" />
      </Form.Item>
    </div>
  );
}
