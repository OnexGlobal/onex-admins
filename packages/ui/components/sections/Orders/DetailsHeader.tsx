import CategoryIcon from "@repo/ui/assets/icons/CategoryIcon";
import { EditIcon } from "@repo/ui/assets/icons/EditIcon";
import FileIcon from "@repo/ui/assets/icons/FileIcon";
import MoneyIcon from "@repo/ui/assets/icons/MoneyIcon";
import ReadyIcon from "@repo/ui/assets/icons/ReadyIcon";
import { orderStatusTexts } from "@repo/ui/constants/order-status-texts";
import { Dispatch, SetStateAction, useState } from "react";
import { OrderData } from "@repo/types/src/orders";
import { SendToHubModal } from "./SendToHubModal";
import { RefundModal } from "./RefundModal";
import RefoundIcon from "@repo/ui/assets/icons/RefoundIcon";
import { SendToIcon } from "@repo/ui/assets/icons/send-to-icon";
import { Permissions } from "@repo/types/src/permissions";
import { Button } from "antd";

interface Props {
  setEditStatus: Dispatch<SetStateAction<boolean>>;
  order: OrderData;
  category: { name: string };
  permissions: Permissions["order"];
}

export default function OrdersDetailsHeader({
  setEditStatus,
  order,
  category,
}: Props) {
  const [sendToHubStatus, setSendToHubStatus] = useState(false);
  const [refundStatus, setRefundStatus] = useState(false);

  return (
    <div className="flex justify-between">
      <div>
        <div className="flex items-center gap-[8px]">
          <img src={order?.warehouse.round_flag} alt="" />
          <img src={order?.dispatch?.icon} alt="" />
          <h1 className="text-description"> {order?.tracking_code}</h1>

          <h1 className="text-info text-oxford-blue-300 whitespace-nowrap">
            {orderStatusTexts[order?.status]}
          </h1>

          {order?.ready_for_pickup ? (
            <h1 className="text-info text-green-500 text-[12px] whitespace-nowrap">
              {
                <div className="flex items-center">
                  <ReadyIcon className="mr-[5px]" />
                  Ready
                </div>
              }
            </h1>
          ) : null}
        </div>
        <div className="flex gap-[8px] items-center">
          <h1 className="text-info text-oxford-blue-300 whitespace-nowrap">
            {order?.customer_comment || ""}
          </h1>

          <h1 className="text-info">
            {
              <div className="flex items-center">
                <MoneyIcon className="mr-[5px]" />
                {order?.declaration_price
                  ? order?.declaration_price + " " + order?.declaration_currency
                  : "Not declarated"}
              </div>
            }
          </h1>

          <h1 className="text-info whitespace-nowrap">
            {
              <div className="flex items-center">
                <CategoryIcon className="mr-[5px]" /> {category?.name || ""}
              </div>
            }
          </h1>
          {order?.invoice ? (
            <a href={order.invoice?.file} target={"_blank"}>
              <h1 className="text-info whitespace-nowrap">
                {
                  <div className="flex items-center">
                    <FileIcon className="mr-[5px]" />
                    Invoice
                  </div>
                }
              </h1>
            </a>
          ) : null}
        </div>
      </div>
      <SendToHubModal
        setSendToHubStatus={setSendToHubStatus}
        sendToHubStatus={sendToHubStatus}
        order={order}
      />
      <RefundModal
        status={refundStatus}
        setStatus={setRefundStatus}
        order={order}
      />
      <div className="flex items-center gap-[12px]">
        <Button
          onClick={() => setRefundStatus(true)}
          type="default"
          icon={<RefoundIcon />}
          className="mr-[10px]"
        >
          Refund
        </Button>
        <Button
          onClick={() => setSendToHubStatus(true)}
          type="default"
          icon={<SendToIcon />}
          className="mr-[10px]"
        >
          Send to hub
        </Button>
        <Button
          onClick={() => setEditStatus(true)}
          type="default"
          icon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
