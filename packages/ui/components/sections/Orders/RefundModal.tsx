import { Button, Modal } from "antd";
import InfoIcon from "@repo/ui/assets/icons/InfoIcon";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import { useRefund } from "@repo/ui/hooks/orders/useRefund.hook";
import { Dispatch, SetStateAction } from "react";
import { OrderData } from "@repo/types/src/orders";

interface Props {
  setStatus: Dispatch<SetStateAction<boolean>>;
  status: boolean;
  order: OrderData;
}

export const RefundModal = ({ status, setStatus, order }: Props) => {
  const { mutate } = useRefund(
    () => {
      setStatus(false);
      notificationSuccess("Success", "Refund successfully");
    },
    () => {
      notificationError("Error", "Something went wrong");
    }
  );

  const handleRefund = () => {
    mutate({ id: order?.id });
  };

  return (
    <Modal
      title={<InfoIcon />}
      width={450}
      open={status}
      onCancel={() => setStatus(false)}
      footer={null}
    >
      <h1 className="text-description mb-[16px]">Refund</h1>
      <h1 className="text-info mb-[16px] text-oxford-blue-300">
        The system will refund X Gel to the customer's Onex balance
      </h1>
      <div className="flex gap-[16px]">
        <Button
          className="w-full bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
          onClick={() => setStatus(false)}
        >
          Cancel
        </Button>
        <Button className="w-full" type="primary" onClick={handleRefund}>
          Refund
        </Button>
      </div>
    </Modal>
  );
};
