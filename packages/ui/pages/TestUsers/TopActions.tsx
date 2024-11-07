import { AutoComplete, Button, Col, DatePicker, Form, Input, Row } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { testUsersAutocomplete } from "../../hooks/testusers/useTestUsersAutocomplete.hook.js";
import { SearchIcon } from "../../assets/icons/SearchIcon.js";

const { RangePicker } = DatePicker;
interface Props {
  setFilters: Dispatch<SetStateAction<Record<string, string | number>>>;
  userInfo: Record<string, string | number> | null;
  setUserInfo: Dispatch<SetStateAction<Record<string, string | number> | null>>;
}

const TestUsersTopActions: FC<Props> = ({
  setFilters,
  userInfo,
  setUserInfo,
}) => {
  const { usersList = [] } = testUsersAutocomplete(
    userInfo && (userInfo?.user_info as string)?.trim()?.length === 0
      ? null
      : userInfo
  );
  const [date, setDate] = useState<[string, string]>();
  const [form] = Form.useForm();
  const handleFinish = (values: Record<string, string>) => {
    let newValues: Record<string, string | number> = { is_test: 1 };
    if (date) {
      values["test_start_date"] = date[0];
      values["test_end_date"] = date[1];
    }

    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        newValues[key] = val;
      }
    });
    setFilters(newValues);
    form.resetFields();
    setUserInfo(null);
  };

  return (
    <div>
      <Form
        style={{ width: "100%" }}
        form={form}
        name="filters"
        layout="vertical"
        initialValues={[{ orderStatus: "status1" }]}
        onFinish={handleFinish}
      >
        <Row gutter={24} className="row">
          <Col lg={6}>
            <Form.Item name="user_info">
              <AutoComplete
                placeholder="Full name or User code"
                onSearch={(val) => {
                  setUserInfo({ user_info: val, is_test: 1 });
                }}
                options={usersList}
                style={{ height: 36 }}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="email"
              rules={[{ type: "email", message: "Must be valid email" }]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item>
              <RangePicker onChange={(_, value) => setDate(value)} />
            </Form.Item>
          </Col>
          <div className="actions-btns">
            <Button type="primary" icon={<SearchIcon />} htmlType="submit">
              Search
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default TestUsersTopActions;
