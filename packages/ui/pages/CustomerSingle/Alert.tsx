import { Alert } from "antd";

export default function CustomerAlert() {
  return (
    <Alert
      type="warning"
      showIcon
      message="Passport details are not filled"
      style={{ marginBottom: 16 }}
    />
  );
}
