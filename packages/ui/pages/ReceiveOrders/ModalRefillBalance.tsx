import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import { Button, Input, Modal, Radio, Space } from "antd";
import { useRefillBalance } from "@repo/ui/hooks/receive-orders/useRefillBalance.hook";
import RefillCircleIcon from "@repo/ui/assets/icons/RefillCircleIcon";
import { Recipient } from "@repo/types/src/prime-users-type";

interface Props {
  fillBalanceStatus: boolean;
  setFillBalanceStatus: Dispatch<SetStateAction<boolean>>;
  user?: Recipient["user"];
  handleSetUser: (val: Recipient["user"]) => void;
}

const ModalRefillBalance: FC<Props> = ({
  fillBalanceStatus,
  setFillBalanceStatus,
  user,
  handleSetUser = () => {},
}) => {
  const [refillAmount, setRefillAmount] = useState(user?.bonus || "");
  const { mutate: refillBalance } = useRefillBalance(
    (data) => {
      handleSetUser(data?.data?.data as Recipient["user"]);
      notificationSuccess(
        "Refill balance",
        "Balance top-up completed successfully"
      );
      setFillBalanceStatus(false);
    },
    (e) => {
      notificationError(
        "Refill balance",
        e?.response?.data?.data?.amount[0] || ""
      );
    }
  );
  useEffect(() => {
    if (fillBalanceStatus) {
      setRefillAmount(user?.bonus || "");
    } else {
      setRefillAmount("");
    }
  }, [fillBalanceStatus]);
  const refillUserBalance = () => {
    refillBalance({ user_id: user?.id, amount: refillAmount });
  };
  return (
    <Modal
      title={<RefillCircleIcon margin={"-5px 0 0 0"} />}
      width={450}
      open={fillBalanceStatus}
      onCancel={() => setFillBalanceStatus(false)}
      footer={null}
    >
      <h1 className="text-description pb-[20px] text-oxford-blue-500">
        Fill balance
      </h1>

      <div className="flex justify-between">
        <div className="w-full">
          <h1 className="text-info pb-[4px] text-oxford-blue-400">Amount</h1>
          <Input
            type={"number"}
            value={refillAmount}
            onChange={(e) => setRefillAmount(e.target.value)}
            suffix="₾"
          />
        </div>
      </div>
      <Radio.Group className="mt-[16px]" value={2}>
        <Space direction={"vertical"}>
          <Radio value={2} className={"mt-16"}>
            <div className="flex justify-between w-[410px] items-center">
              <h1 className="text-info">Apply bonus</h1>
              <h1 className="text-info text-oxford-blue-200">
                {(user?.bonus || "") + " ₾"}
              </h1>
            </div>
          </Radio>
        </Space>
      </Radio.Group>
      <div className="flex justify-between mt-[16px]">
        <Button className="w-[48%]" onClick={() => setFillBalanceStatus(false)}>
          Cancel
        </Button>
        <Button
          className={`w-[48%] ${
            refillAmount ? "bg-oxford-blue-300" : "bg-oxford-blue-100"
          }`}
          disabled={!refillAmount}
          onClick={refillUserBalance}
        >
          Fill
        </Button>
      </div>
    </Modal>
  );
};
export default memo(ModalRefillBalance);
