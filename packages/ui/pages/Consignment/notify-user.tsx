import { Button, Checkbox, DatePicker, Form, Popconfirm, Select } from "antd";
import { FC } from "react";
import { consignmentApi } from "../../services/consignment";
import dayjs from "dayjs";
import { Consignment } from "../../../types/src/consignment";
import { useMutation } from "@tanstack/react-query";
import { notificationSuccess } from "../../helpers/notification";

interface Props {
  consignment: Consignment;
}
const NotifyUser: FC<Props> = ({ consignment }) => {
  const [form] = Form.useForm();
  let { resetFields } = form;

  const { mutate } = useMutation({
    mutationKey: ["set-boxes-estimate"],
    mutationFn: consignmentApi.setBoxesEstimate,
    onSuccess: () => {
      notificationSuccess("Edit orders", "Editing done successfully");
      resetFields();
    },
    onError: (e) => {
      console.log(e, "errrr");
    },
  });

  const onFinish = (values: Record<string, any>) => {
    let newData = {
      box_ids: values?.box_ids,
      estimation_data: {
        estimated_date_from: dayjs(values?.estimation_data).format(
          "YYYY-MM-DD"
        ),
        estimated_date_to: dayjs(values?.estimation_data).format("YYYY-MM-DD"),
      },
      notification_instructions: {
        notify_by_app: values?.notify_by_app,
        notify_by_email: values?.notify_by_email,
      },
    };
    mutate(newData);
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="_paper flex gap-[16px] items-start mb-[24px]"
      initialValues={{ notify_by_app: false, notify_by_email: false }}
    >
      <Form.Item
        name={"box_ids"}
        label="Box ID"
        rules={[{ required: true, message: "Please select box id" }]}
      >
        <Select style={{ width: 415 }} mode={"multiple"}>
          {consignment?.boxes?.map((box, i) => (
            <Select.Option key={i} value={box.id}>
              {box.reference_id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="New Date"
        name={"estimation_data"}
        rules={[{ required: true, message: "Please select estimation data" }]}
      >
        <DatePicker format={"DD.MM.YYYY"} />
      </Form.Item>
      <div>
        <span className="text-oxford-blue-300 text-[14px] pb-[12px]">
          Notify customer
        </span>
        <div className="flex items-center">
          <Form.Item name={"notify_by_email"} valuePropName="checked">
            <Checkbox>Mail</Checkbox>
          </Form.Item>
          <Form.Item name={"notify_by_app"} valuePropName="checked">
            <Checkbox>Notifications</Checkbox>
          </Form.Item>
        </div>
      </div>

      <Popconfirm title={"Are you sure?"} onConfirm={() => form.submit()}>
        <Button type="primary" className="self-center">
          Send
        </Button>
      </Popconfirm>
    </Form>
  );
};
export default NotifyUser;
