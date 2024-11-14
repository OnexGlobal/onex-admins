import { Button, message, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { SendToHubFailedOrderModal } from "./SendToHubModal";
import { ShowReasonModal } from "./ShowReasonModal";
import OrderStatusIcon from "@repo/ui/constants/order-status-icon";
import { SendToIcon } from "@repo/ui/assets/icons/send-to-icon";
import DownloadIcon from "@repo/ui/assets/icons/DownloadIcon";
import { balanceApi } from "@repo/ui/services/balance";
import { Meta } from "@repo/types";
import { FailedOrderData } from "@repo/types/src/orders";
import Table from "../../components/table/Table";

interface Props {
  setFilter: Dispatch<SetStateAction<Record<string, string | number>>>;
  meta: Meta;
  orders: FailedOrderData[];
  isLoading: boolean;
  permissions?: [];
}

export default function FailedOrdersTable({
  orders,
  meta,
  setFilter = () => {},
  isLoading,
}: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [sendToHub, setSendToHub] = useState<FailedOrderData["order"] | false>(
    false
  );
  const [showReason, setShowReason] = useState<string[] | false>(false);

  const columns = [
    {
      key: "index",
      dataIndex: "index",
      title: "",
      width: "50px",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "Tracking",
    },

    {
      key: "status",
      dataIndex: "status",
      title: "Status",
    },
    {
      key: "reason",
      dataIndex: "reason",
      title: "Reason",
      width: "40%",
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      width: 200,
    },
  ];

  const dataSource = orders?.map((order, index) => ({
    key: index,
    index: order.id,
    tracking: (
      <div
        className="flex"
        onClick={() => {
          navigator.clipboard.writeText(order?.order?.tracking_code || "");
          messageApi.success("Copied");
        }}
      >
        <Tooltip placement={"bottom"} title={"Click to copy"}>
          <h1 className="text-info cursor-pointer">
            {order?.order?.tracking_code || ""}
          </h1>
        </Tooltip>
      </div>
    ),
    status: (
      <div className="flex items-center">
        <OrderStatusIcon status={"at_warehouse"} />
        <h1 className="text-info text-oxford-blue-300 ml-[5px]">
          At Warehouse
        </h1>
        <h1 className="text-info  ml-[5px]">
          {order?.order?.histories?.length > 0
            ? dayjs(order?.order?.histories[0]?.date).format("DD.MM.YYYY")
            : ""}
        </h1>
      </div>
    ),
    reason: (
      <div className="flex w-full overflow-hidden flex-wrap">
        {order?.note?.split("|")?.length < 4 ? (
          order?.note?.split("|")?.map((not, i) => (
            <Tag
              className={"tag"}
              style={{ maxWidth: `${100 / order?.note?.split("|")?.length}%` }}
              key={i}
            >
              {not}
            </Tag>
          ))
        ) : (
          <>
            {order?.note
              ?.split("|")
              .slice(0, 3)
              ?.map((not, i) => (
                <Tag
                  className={"tag"}
                  style={{
                    maxWidth: `${100 / 3.5}%`,
                  }}
                  key={i}
                >
                  {not}
                </Tag>
              ))}
            <Tag
              className={"tag tag_details"}
              onClick={() => setShowReason(order?.note?.split("|"))}
            >
              +{order?.note?.split("|")?.length - 3}
            </Tag>
          </>
        )}
      </div>
    ),
    action: (
      <Button
        type={"default"}
        onClick={() => setSendToHub(order.order)}
        icon={<SendToIcon />}
      >
        Send to hub
      </Button>
    ),
  }));

  return (
    <>
      {contextHolder}
      <Table
        className="w-[100%]"
        columns={columns}
        bordered
        dataSource={dataSource}
        loading={isLoading}
        meta={meta}
        onChangePage={(page) => setFilter((p) => ({ ...p, page }))}
        onChangePerPage={(per_page) => setFilter((p) => ({ ...p, per_page }))}
      />
      <div className={"new-pagination"}>
        <Button
          disabled
          type="primary"
          className="mt-[8px] mr-auto disabled:!text-white disabled:!bg-oxford-blue-100"
          icon={<DownloadIcon color={"#ffffff"} />}
          onClick={() => balanceApi.exportExelList(null)}
        >
          Excel
        </Button>
      </div>
      <SendToHubFailedOrderModal
        setSendToHub={setSendToHub}
        sendToHub={sendToHub}
      />
      <ShowReasonModal open={showReason} setOpen={setShowReason} />
    </>
  );
}
