import { Form, Input } from "antd";

export default function Comment() {
  return (
    <Form.Item label={"Onex comment"}>
      <Input value="Lorem ipsum is simple dummy text" />
    </Form.Item>
  );
}
