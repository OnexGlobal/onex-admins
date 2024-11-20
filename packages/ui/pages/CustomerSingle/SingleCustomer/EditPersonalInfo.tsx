import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetAccountDetails from "../../../hooks/customers/useGetAccountDetails.hook";
import { useMutationUpdateUserInf } from "../../../hooks/customers/useMutationUpdateUserInfo.hook";
import { notificationSuccess } from "../../../helpers/notification";

export default function EditPersonalInfo({
  setEditPersonalInfoStatus,
}: {
  setEditPersonalInfoStatus: (val: boolean) => void;
}) {
  const { id } = useParams();
  const { accountDetails } = useGetAccountDetails(id);
  const { mutate, isPending } = useMutationUpdateUserInf(() =>
    notificationSuccess("", "Saved")
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (accountDetails) {
      const isPersonData = accountDetails?.recipient?.is_person
        ? {
            first_name: accountDetails?.recipient?.first_name || "",
            last_name: accountDetails?.recipient?.last_name || "",
            georgian_first_name:
              accountDetails?.recipient?.georgian_first_name || "",
            georgian_last_name:
              accountDetails?.recipient?.georgian_last_name || "",
          }
        : {
            georgian_company_name:
              accountDetails?.recipient?.georgian_company_name || "",
            company_name: accountDetails?.recipient?.company_name || "",
          };
      form.setFieldsValue({
        email: accountDetails?.email,
        phone: accountDetails?.phone,
        address: accountDetails?.recipient?.address,
        document_type: accountDetails?.recipient?.document_type,
        document_number: accountDetails?.recipient?.document_number,
        gender: accountDetails?.recipient?.gender,
        ...isPersonData,
      });
    }
  }, []);
  const handleSave = (values: Record<string, string>) => {
    if (values) {
      const data = {
        account: {
          email: values.email,
          birthday_date: "2000-03-20",
        },
        recipient: {
          first_name: values.first_name,
          last_name: values.last_name,
          georgian_first_name: values.georgian_first_name,
          georgian_last_name: values.georgian_last_name,
          document_number: values.document_number,
          document_type: values.document_type,
          address: values.address,
          phone: values.phone,
          gender: values.gender,
        },
      };
      mutate({ id, data });
    }
  };

  return (
    <>
      <Form
        name="editPersonalInfo"
        onFinish={handleSave}
        onFinishFailed={(e) => console.log(e)}
        layout="vertical"
        form={form}
        className="mt-[36px]"
      >
        <div className="absolute top-[-100px] right-[20px]">
          <div className="flex gap-x-[16px]">
            <Button
              onClick={() => setEditPersonalInfoStatus(false)}
              type="default"
              className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" loading={isPending}>
              Save
            </Button>
          </div>
        </div>
        <Row gutter={16}>
          {accountDetails?.recipient?.is_person ? (
            <Col lg={8}>
              <Form.Item name="first_name" label={"Name"}>
                <Input />
              </Form.Item>

              <Form.Item name="last_name" label={"Surname"}>
                <Input />
              </Form.Item>

              <Form.Item
                name="georgian_first_name"
                label={"First Name in Georgian"}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="georgian_last_name"
                label={"Last  Name in Georgian"}
              >
                <Input />
              </Form.Item>
            </Col>
          ) : (
            <Col lg={8}>
              <Form.Item name="company_name" label={"Company name"}>
                <Input />
              </Form.Item>

              <Form.Item
                name="georgian_company_name"
                label={"Company name (Georgian)"}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          <Col lg={8}>
            <Form.Item name="email" label={"Email"}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label={"Phone"}>
              <Input />
            </Form.Item>

            <Form.Item name="address" label={"Address"}>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Space.Compact className="flex items-end">
              <Form.Item name="document_type" label={"Passport details"}>
                <Select
                  defaultValue={accountDetails?.recipient?.document_type || ""}
                  style={{ width: 220 }}
                >
                  <Select.Option value="passport">Passport</Select.Option>
                  <Select.Option value="id">ID</Select.Option>
                  <Select.Option value="foreign_citizen">
                    Foreigh Citizen
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="document_number">
                <Input />
              </Form.Item>
            </Space.Compact>
            <Form.Item name="gender" label={"Gender"}>
              <Select defaultValue={accountDetails?.recipient?.gender || ""}>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label={"Birthday"}>
              <DatePicker style={{ width: "100%" }} inputReadOnly={true} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
