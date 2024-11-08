import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Divider, Form, Input, Modal } from "antd";
import { RefundType } from "@repo/types/src/online-payment";
import { useIsRefundPayment } from "../../hooks/online-payment/useIsRefundPayment.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { RefundedCircleIcon } from "../../assets/icons/RefundedCircleIcon";

interface Props {
  refund: RefundType;
  setRefund: Dispatch<SetStateAction<RefundType>>;
}

export const RefundPaymentModal = ({ refund, setRefund }: Props) => {
  const [form] = Form.useForm();
  const { mutate } = useIsRefundPayment(
    () => {
      notificationSuccess("Refund", "Refund success");
      form.resetFields();
      setRefund(false);
    },
    () => notificationError("Refund", "something went wrong")
  );
  const onFinish = (values: RefundType) => {
    if (refund && refund?.id) mutate({ id: refund?.id, ...values });
  };
  useEffect(() => {
    if (refund) {
      form.setFieldValue(
        "amount",
        +refund?.request_amount - +refund?.refund_amount
      );
    }
  }, [refund]);
  return (
    <Modal
      title={<RefundedCircleIcon />}
      open={Boolean(refund)}
      onCancel={() => setRefund(false)}
      footer={false}
    >
      <span className="text-[18px] font-[500]">
        Refund to customer bank card
      </span>
      <Divider />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="amount"
          label="Refound amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Refound amount"} suffix="₾" />
        </Form.Item>
        <div className="flex gap-[16px]">
          <Button
            type="default"
            htmlType="reset"
            onClick={() => {
              setRefund(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Refund
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
