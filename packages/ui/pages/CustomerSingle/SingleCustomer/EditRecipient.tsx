import { EditRecipientType } from "@repo/types/src/customers-type";
import { Button, Col, Drawer, Form, Input, Row, Select, Tooltip } from "antd";
import { useEffect } from "react";
import { useMutationUpdateRecipient } from "../../../hooks/recipients/useMutationUpdateRecipinet.hook";
import { notificationSuccess } from "../../../helpers/notification";
import { InfoCircleIcon } from "../../../assets/icons/InfoCircleIcon";
import useRegions from "../../../hooks/useRegions.hook";
import { FileUpload } from "../../../components/buttons/Uploads";
import { UploadOutlined } from "@ant-design/icons";
import InputPhone from "@repo/ui/components/inputs/InputPhone";

export const EditRecipient = ({
  recipient,
  setRecipient,
  refetch,
}: EditRecipientType) => {
  const [form] = Form.useForm();
  const { regions = [] } = useRegions();

  useEffect(() => {
    if (recipient) {
      form.setFieldsValue({
        first_name: recipient?.first_name || "",
        last_name: recipient?.last_name || "",
        phone: recipient?.phone || "",
        region_id: recipient?.region_id || "",
        ru_first_name: recipient?.georgian_first_name || "",
        ru_last_name: recipient?.georgian_last_name || "",
        document_number: recipient?.document_number || "",
        document_type: recipient?.document_type || "",
        inn_number: recipient?.inn_number || "",
      });
    }
  }, [recipient, form]);

  const { mutate } = useMutationUpdateRecipient(() => {
    notificationSuccess("Recipient", "Recipient Service updated successfully");
    refetch();
  });
  const onFinish = ({
    first_name,
    last_name,
    company_name,
    georgian_company_name,
    ...values
  }: Record<string, string>) => {
    const isPersonData = recipient?.is_person
      ? { first_name, last_name }
      : { company_name, georgian_company_name };

    const data = {
      ...isPersonData,
      ...values,
      user_code: recipient?.user_code || "",
      community_id: recipient?.community_id || "",
      address: recipient?.address || "",
      is_person: recipient?.is_person,
    };

    mutate({ id: recipient?.id, data: data });
  };
  const handelClosed = () => {
    form.resetFields();
    setRecipient(null);
  };
  if (!recipient) return <></>;
  return (
    <Drawer
      styles={{ header: { display: "none" }, body: { background: "#f9fafb" } }}
      placement="right"
      onClose={handelClosed}
      open={!!recipient}
      width="1112px"
    >
      <Form onFinish={onFinish} form={form} layout={"vertical"}>
        <div className={"flex justify-between items-center mb-[24px]"}>
          <p className="text-description">Edit recipient</p>

          <div className="flex gap-[16px]">
            <Button
              className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
              onClick={() => setRecipient(null)}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Edit
            </Button>
          </div>
        </div>
        <div className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] mb-[24px]">
          <span className="font-[500] text-[14px] mb-[8px] text-oxford-blue-300">
            Personal data (Latin)
          </span>

          <Row gutter={16}>
            <Col lg={12}>
              <Form.Item name={"first_name"} label={"Name"}>
                <Input placeholder={"Name"} />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item name={"last_name"} label={"Surname"}>
                <Input placeholder={"Surname"} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div
          className={
            "rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px]  mb-[24px]"
          }
        >
          <span className="font-[500] text-[14px] mb-[8px] text-oxford-blue-300">
            Personal data (Russian)
          </span>
          <Row gutter={16}>
            <Col lg={8}>
              <Form.Item name={"ru_first_name"} label={"Name"}>
                <Input placeholder={"Name"} />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name={"ru_last_name"} label={"Surname"}>
                <Input placeholder={"Surname"} />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name={"fatherhood"} label={"Fatherhood"}>
                <Input placeholder={"Fatherhood"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"document_type"} label={"Series"}>
                <Input placeholder={"Series"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"document_number"} label={"Passport number"}>
                <Input placeholder={"Passport number"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"issue_date"} label={"Issue date"}>
                <Input placeholder={"Issue date"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"inn_number"} label={"INN"}>
                <Input
                  placeholder={"INN"}
                  suffix={
                    <Tooltip
                      title="Extra INN information"
                      color={"#0A2540"}
                      overlayInnerStyle={{ fontSize: 12 }}
                    >
                      <InfoCircleIcon color={"#89B9E6"} size={20} />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={"passport_photo"} label={"Passport photo"}>
                <FileUpload onChange={(val) => console.log(val, 656566)}>
                  <Button type="link" icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </FileUpload>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px]  mb-[24px]">
          <span className="font-[500] text-oxford-blue-300">
            Shipping address
          </span>

          <Row gutter={16}>
            <Col lg={12}>
              <Form.Item name={"region_id"} label={"Region"}>
                <Select placeholder={"Region"} options={regions} />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item name={"city"} label={"City"}>
                <Input placeholder={"City"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"street"} label={"Street"}>
                <Input placeholder={"Street"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"house"} label={"House"}>
                <Input placeholder={"House"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"construction"} label={"Construction"}>
                <Input placeholder={"Construction"} />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item name={"apartment"} label={"Apartment"}>
                <Input placeholder={"Apartment"} />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item name={"phone"} label={"Phone number"}>
                <InputPhone placeholder="Phone number" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item name={"index"} label={"Index"}>
                <Input
                  placeholder={"Index"}
                  suffix={
                    <Tooltip
                      title="Extra Index information"
                      color={"#0A2540"}
                      overlayInnerStyle={{ fontSize: 12 }}
                    >
                      <InfoCircleIcon color={"#89B9E6"} size={20} />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Drawer>
  );
};
