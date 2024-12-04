import { Button, Popover } from "antd";
import { useSendToHub } from "../../hooks/orders/useSendToHub.hook";
import { FC, useState } from "react";
import { Refetch } from "@repo/types";
import InfoIcon from "../../assets/icons/InfoIcon";
import { SendToIcon } from "../../assets/icons/send-to-icon";
interface Props {
  id: number;
  refetch: Refetch;
}

export const SendToHubPopover: FC<Props> = ({ id, refetch }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [isError, setIsError] = useState(false);
  const { mutate, isPending } = useSendToHub(
    () => {
      setOpenPopover(false);
      refetch();
    },
    () => setIsError(true)
  );
  return (
    <Popover
      content={
        <div className="flex justify-center">
          <Button
            className="w-[100px]"
            type="default"
            onClick={() => {
              setOpenPopover(false);
              setIsError(false);
            }}
          >
            Cancel
          </Button>

          <Button
            style={{ width: 100 }}
            type="primary"
            loading={isPending}
            onClick={() => mutate({ parcel_id: id })}
          >
            {isPending ? "Loading" : "Yes"}
          </Button>
        </div>
      }
      title={
        <div
          className="flex items-center"
          style={{ color: isError ? "#FC4447" : "#FC9A3A" }}
        >
          <InfoIcon style={{ margin: "0 10px  0" }} />
          {isError ? "Something went wrong" : "Sure to accept"}
        </div>
      }
      trigger="click"
      open={openPopover}
      onOpenChange={(newOpen) => {
        setOpenPopover(newOpen);
        setIsError(false);
      }}
    >
      <Button icon={<SendToIcon />}>Send to hub</Button>
    </Popover>
  );
};
