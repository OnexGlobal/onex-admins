import { Button, Table, Tag, Tooltip } from "antd";
import AlertCircleIcon from "@repo/ui/assets/icons/AlertCircleIcon";
import BfmIcon from "@repo/ui/assets/icons/BfmIcon";
import DownloadIcon from "@repo/ui/assets/icons/DownloadIcon";
import PrimeIcon from "@repo/ui/assets/icons/PrimeIcon";
import dayjs from "dayjs";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { DownloadOrdersExcelService } from "@repo/ui/services/downloadExcel";
import { Filters, OrderData } from "@repo/types/src/orders";
import OrderStatusIcon from "../../constants/order-status-icon";
import { orderStatusTexts } from "@repo/ui/constants/order-status-texts";
import ReadyIcon from "@repo/ui/assets/icons/ReadyIcon";
import EstimateIcon from "@repo/ui/assets/icons/EstimateIcon";
import DeliveryIcon from "@repo/ui/assets/icons/DeliveryIcon";
import InfoIcon from "@repo/ui/assets/icons/InfoIcon";
import { notificationSuccess } from "@repo/ui/helpers/notification";
import { Permissions } from "@repo/types/src/permissions";
import { Meta } from "@repo/types";
import { EyeIcon } from "@repo/ui/assets/icons/EyeIcon";
import OnexTable from "../../components/table/Table";

type ID = string;
type SetState<T> = Dispatch<SetStateAction<T>>;

interface Props {
  setDetailsStatus: SetState<boolean>;
  id: ID;
  setId: SetState<ID>;
  orders: OrderData[];
  meta: Meta;
  setFilters: SetState<Filters>;
  filters: Filters;
  isLoading?: boolean;
  permissions: Permissions["order"];
}

export default function OrdersTable({
  setDetailsStatus,
  setId,
  orders,
  meta,
  setFilters,
  filters,
  isLoading,
  ...props
}: Props) {
  const handleDownloadExcel = () => DownloadOrdersExcelService(filters);

  const columns = [
    {
      key: "country",
      dataIndex: "country",
      title: "",
      width: "7%",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "",
      width: "24%",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "",
      width: "10%",
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "",
      width: "7%",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "",
    },
    {
      key: "pickup_point",
      dataIndex: "pickup_point",
      title: "",
    },
    {
      key: "eye",
      dataIndex: "eye",
      title: "",
      width: 100,
    },
  ];

  const data = orders?.map((order, index) => ({
    key: index,
    id: String(order.id),
    country: (
      <div>
        <div className="flex items-center gap-[8px]">
          <Tooltip title={"Warehouse"} placement={"bottom"}>
            <img src={order?.warehouse?.round_flag || ""} width={24} alt="" />
          </Tooltip>
          <img src={order?.dispatch?.icon || ""} width={24} alt="" />
        </div>
        <h1 className="text-info font-[500]">{order?.parcel?.name || ""}</h1>
      </div>
    ),
    name: (
      <div className="flex gap-[4px]">
        <h1 className="text-info font-[500]">{`${
          order?.recipient?.first_name || ""
        } ${order?.recipient?.last_name || ""} ${
          order?.recipient?.company_name || ""
        } ${order?.recipient?.user_code}`}</h1>
        {order?.recipient?.user?.is_prime ? (
          <Tooltip title={"Prime"}>
            <PrimeIcon />
          </Tooltip>
        ) : null}
      </div>
    ),
    tracking: (
      <div className="flex flex-col gap-[8px]">
        <div
          className="flex gap-[4px]"
          onClick={() => {
            navigator.clipboard.writeText(order?.tracking_code);
            notificationSuccess("Copied");
          }}
        >
          <Tooltip title={"Click to copy"} placement={"bottom"}>
            <h1 className="text-info">{order?.tracking_code}</h1>
          </Tooltip>
          {order?.purchase_type === "buy_for_me" ? (
            <Tooltip title={"Buy for me"} placement={"bottom"}>
              <BfmIcon />
            </Tooltip>
          ) : null}
        </div>

        {order?.customer_comment ? (
          <Tooltip
            title={<span>{order?.customer_comment || ""}</span>}
            trigger="hover"
            color={"#0a2540"}
          >
            <h1 className="text-info text-oxford-blue-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] cursor-pointer relative">
              {order?.customer_comment}
            </h1>
          </Tooltip>
        ) : null}

        {order?.dangerous ? (
          <Tooltip placement={"top"} title={"Dangerous"}>
            <AlertCircleIcon />
          </Tooltip>
        ) : null}
      </div>
    ),
    weight: (
      <Tooltip title={"Weight"} placement={"bottom"}>
        <h1 className="text-info">{`${order?.weight} kg`}</h1>
      </Tooltip>
    ),
    price: (
      <div className="flex flex-col gap-[4px]">
        <div className="flex">
          <h1 className="text-info mr-[7px]">{`${order?.cost}  $`}</h1>
          {order?.additional_cost ? (
            <Tooltip title={"Add cost"} placement={"bottom"}>
              <h1 className="text-info text-oxford-blue-200">
                {order?.additional_cost + " $"}
              </h1>
            </Tooltip>
          ) : null}
        </div>
        {!order?.declaration_price ? (
          <h1 className="text-info text-red-500 whitespace-nowrap">
            Not declared
          </h1>
        ) : (
          <h1 className="text-info text-oxford-blue-300 whitespace-nowrap">{`${
            order?.declaration_price
              ? order?.declaration_price + " " + order?.declaration_currency
              : ""
          } `}</h1>
        )}
      </div>
    ),
    status: (
      <div>
        <div className="flex flex-nowrap gap-[5px]">
          <OrderStatusIcon status={order?.status} />
          <div className="flex">
            <h1 className="text-info text-oxford-blue-300 whitespace-nowrap">
              {orderStatusTexts[order?.status]}
            </h1>

            <Tooltip
              title={order?.histories[order?.histories?.length - 1]?.date}
              placement={"bottom"}
            >
              <h1 className="text-info ml-[6px]">
                {order?.histories?.length > 0
                  ? dayjs(
                      order?.histories[order?.histories?.length - 1]?.date
                    ).format("DD.MM.YYYY")
                  : ""}
              </h1>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center mt-[10px]">
          <div className="flex">
            {order?.status === "in_georgia" ? (
              <div className="flex gap-[5px]">
                {order?.ready_for_pickup ? (
                  <>
                    <ReadyIcon />
                    <h1 className="text-info text-green-500">Ready</h1>
                  </>
                ) : order?.custom?.custom_status?.status === "double_check" ? (
                  <h1 className="text-info text-red-500">Double Check</h1>
                ) : order?.custom?.custom_tax_id?.id ? (
                  <h1 className="text-info text-red-500">Tax occurred</h1>
                ) : order?.custom?.declaration_group_id ? (
                  <h1 className="text-info text-red-500">Need declaration</h1>
                ) : order?.custom ? (
                  <h1 className="text-info text-red-500">In customs</h1>
                ) : (
                  <h1 className="text-info text-red-500">Not Ready</h1>
                )}
              </div>
            ) : (
              <div className="flex flex-nowrap items-center gap-[5px]">
                <EstimateIcon />
                <div className="flex items-center">
                  <h1 className="text-info text-oxford-blue-300">Estimated</h1>
                  <h1 className="text-info ml-[6px]">
                    {order?.estimated_date_to
                      ? dayjs(order?.estimated_date_to).format("DD.MM.YYYY")
                      : ""}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        {!!order.service && (
          <div className="flex items-center">
            <img src={order?.service?.smart_service.image} width="25" />
            <div className="flex items-center gap-[8px]">
              <h1 className="text-info text-oxford-blue-300">
                {order?.service?.smart_service?.current_smart_service?.name ||
                  ""}
              </h1>
              <Tag className="bg-cyan-50 text-cyan-600">
                {order?.service?.status || ""}
              </Tag>
            </div>
          </div>
        )}
      </div>
    ),
    pickup_point: (
      <>
        <h1 className="text-info">{order?.pickup_point?.name}</h1>
        {order?.delivery && order?.delivery?.type === "home" ? (
          <div className="flex gap-[8px]">
            <DeliveryIcon />
            <h1 className="text-info">Home delivery</h1>
            <Tooltip
              placement={"top"}
              title={`${order?.delivery?.delivery_home?.delivery_date}`}
            >
              <InfoIcon />
            </Tooltip>
          </div>
        ) : (
          ""
        )}
      </>
    ),
    eye: (
      <EyeIcon
        onClick={() => {
          setDetailsStatus(true);
          setId(String(order.id));
        }}
      />
    ),
  }));

  return (
    <>
      <OnexTable
        {...props}
        className="w-[100%] custom-table"
        columns={columns}
        bordered
        meta={meta}
        dataSource={data}
        loading={isLoading}
        onChangePage={(page) => setFilters((p) => ({ ...p, page }))}
        onChangePerPage={(per_page) => setFilters((p) => ({ ...p, per_page }))}
        components={{
          header: {
            wrapper: (props: HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="hidden" />
            ),
          },
        }}
        summary={() => (
          <Table.Summary fixed={"bottom"}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={24}>
                <h1 className="text-info text-[16px]">
                  {`Cost: ${meta?.options?.total_cost}  $ |  Add.Cost: ${meta?.options?.total_additional_cost}  $ |  V Weight: ${meta?.options?.total_v_weight} |  Weight: ${meta?.options?.total_weight}`}
                </h1>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      <div className="flex pb-[24px]">
        <Button
          onClick={() => handleDownloadExcel()}
          type="primary"
          icon={<DownloadIcon color={"#ffffff"} />}
          className="mt-[16px]"
        >
          Excel
        </Button>
      </div>
    </>
  );
}
