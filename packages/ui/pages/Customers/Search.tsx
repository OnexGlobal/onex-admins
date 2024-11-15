import { Users } from "@repo/types";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";
import { RefreshIcon } from "../../assets/icons/RefreshIcon";

export default function CustomersSearch({
  setFilter,
  filter,
  refetch,
}: Users.CustomersSearchType) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (filter && Object.values(filter)?.length) {
      Object.entries(filter).forEach(([key, val]) => {
        form.setFieldsValue({ search_key: key, search_value: val }); //todo
      });
    }
  }, []);
  const handleRefresh = () => {
    refetch();
    setFilter({});
  };
  const onFinish = (values: Record<string, string>) => {
    setFilter({ [values.search_key]: values.search_value });
  };
  return (
    <div className="flex flex-col">
      <h2 className="text-info text-oxford-blue-300 mb-[4px] font-[500] mr-[16px]">
        Search by
      </h2>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          search_key: "user_info",
        }}
      >
        <div className="flex item-center gap-[16px]">
          <Space.Compact>
            <Form.Item name={"search_key"}>
              <Select
                style={{ width: 220 }}
                options={[
                  { value: "user_info", label: "Full name or User Code" },
                  {
                    value: "phone",
                    label: "Phone",
                  },
                  { value: "user_id", label: "ID" },
                  { value: "address", label: "Address" },
                  {
                    value: "email",
                    label: "Email",
                  },
                  { value: "passport_details", label: "Passport details" },
                ]}
              />
            </Form.Item>
            <Form.Item name={"search_value"}>
              <Input
                placeholder={"Search"}
                style={{ width: 290 }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    form.submit();
                  }
                }}
              />
            </Form.Item>
          </Space.Compact>

          <Button htmlType="submit" type="primary" className="mb-[16px]">
            Search
          </Button>
          <Button
            htmlType={"reset"}
            onClick={() => handleRefresh()}
            icon={<RefreshIcon />}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
