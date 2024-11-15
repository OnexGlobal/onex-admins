import { Refetch } from "@repo/types";
import { Recipient, UserType } from "@repo/types/src/users";
import { Button, Form, Input, Modal } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAddBankTransfer } from "../../hooks/balances/useAddBankTransfer.hook";
import { notificationSuccess } from "../../components/alerts/notification";
import { TransferCircleIcon } from "../../assets/icons/TransferCircleIcon";
import PrimeIcon from "../../assets/icons/PrimeIcon";

const { TextArea } = Input;

interface Props {
  user: UserType;
  recipient?: Recipient;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  refetch: Refetch;
}

export const AddBankTransferModal: FC<Props> = ({
  user,
  recipient,
  setOpen = () => {},
  open,
  refetch = () => {},
}) => {
  const [form] = Form.useForm();
  const [transfer, setTransfer] = useState("");
  const { mutate } = useAddBankTransfer({
    onSuccess: () => {
      refetch();
      setOpen(false);
      form.resetFields();
      notificationSuccess(
        "Bank Transfer",
        "This Transfer successfully has been sent!"
      );
    },
  });

  const onFinish = (values: Record<string, string>) => {
    mutate({
      user_id: user?.id ? user?.id : recipient?.user_id,
      ...values,
    });
  };

  return (
    <Modal
      title={<TransferCircleIcon />}
      width={"450px"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <span className="text-[18px] text-black ">Add bank transfer</span>

      <div
        className="flex items-center mt-[8px] mb-[16px]"
        style={{ margin: "8px 0 16px 0" }}
      >
        <span className="text-[14px] font-[500] text-black">
          {(user?.recipient?.first_name || recipient?.first_name || "") +
            " " +
            (user?.recipient?.last_name || recipient?.last_name || "") +
            " " +
            (user?.recipient?.user_code || recipient?.user_code || "")}
        </span>

        {user?.is_prime || recipient?.user?.is_prime ? (
          <PrimeIcon margin={"0 auto 0 5px"} />
        ) : (
          ""
        )}
      </div>

      <Form
        form={form}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <span className="text-oxford-blue-400 text-[14px] font-[500]">
          Bank transfer amount
        </span>

        <Form.Item
          name="sum"
          rules={[
            {
              required: true,
              message: "The amount can not be blank.",
            },
          ]}
        >
          <Input
            suffix={import.meta.env.VITE_APP_CURRENCY || ""}
            type={"number"}
            placeholder={"Enter amount"}
            onChange={(e) => setTransfer(e.target.value)}
          />
        </Form.Item>
        <span className="text-oxford-blue-400 text-[14px] font-[500]">
          Description
        </span>
        <Form.Item name="description">
          <TextArea placeholder={"Description"} showCount maxLength={244} />
        </Form.Item>
        <div className="flex space-between mt-[44px] gap-[16px] [&>button]:flex-1">
          <Button onClick={() => setOpen(false)} type="default">
            Cancel
          </Button>
          <Button htmlType="submit">
            Transfer $
            {transfer ? transfer + import.meta.env.VITE_APP_CURRENCY || "" : ""}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
