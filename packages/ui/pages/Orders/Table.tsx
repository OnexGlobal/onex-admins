import { Pagination, Table, Tooltip } from "antd";
import { PrimaryButton } from "components/elements/Button";
import Flex from "components/elements/Flex";
import { Tag } from "components/elements/Tag";
import { Typography } from "components/elements/Typography";
import AlertCircleIcon from "components/svg-components/AlertCircleIcon";
import BfmIcon from "components/svg-components/BfmIcon";
import DownloadIcon from "components/svg-components/DownloadIcon";
import PrimeIcon from "components/svg-components/PrimeIcon";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { DownloadOrdersExcelService } from "services/downloadExcel";
import { Filters, OrderData } from "types/orders";
import OrderStatusIcon from "constants/order-status-icon";
import { orderStatusTexts } from "constants/order-status-texts";
import ReadyIcon from "components/svg-components/ReadyIcon";
import EstimateIcon from "components/svg-components/EstimateIcon";
import DeliveryIcon from "components/svg-components/DeliveryIcon";
import InfoIcon from "components/svg-components/InfoIcon";
import { notificationSuccess } from "helpers/notification";
import { PermissionsType } from "types/permissions";
import { MetaType } from "types/meta-type";
import { PermissionFinder } from "helpers/permissionFinder";
import { EyeIcon } from "components/svg-components/EyeIcon";

type ID = string | number | undefined;
type SetState<T> = Dispatch<SetStateAction<T>>;

interface Props {
  setDetailsStatus: SetState<boolean>;
  id: ID;
  setId: SetState<ID>;
  orders: OrderData[];
  meta: MetaType;
  setFilters: SetState<Filters>;
  filters: Filters;
  isLoading?: boolean;
  permissions: PermissionsType["order"];
}

export default function OrdersTable({
  setDetailsStatus,
  setId,
  orders,
  meta,
  setFilters,
  filters,
  isLoading,
  permissions,
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
      key: "date",
      dataIndex: "date",
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
    id: order.id,
    country: (
      <div>
        <Flex alignItems={"center"} gap={"8px"}>
          <Tooltip title={"Warehouse"} placement={"bottom"}>
            <img src={order?.warehouse?.round_flag || ""} alt="" />
          </Tooltip>

          <img src={order?.dispatch?.icon || ""} alt="" />
        </Flex>
        <Typography text={order?.parcel?.name || ""} fontWeight="500" />
      </div>
    ),
    name: (
      <Flex gap={"4px"}>
        <Typography
          text={`${order?.recipient?.first_name || ""} ${
            order?.recipient?.last_name || ""
          } ${order?.recipient?.company_name || ""} ${order?.recipient
            ?.user_code}`}
          fontWeight="500"
        />
        {order?.recipient?.user?.is_prime ? (
          <Tooltip title={"Prime"}>
            <PrimeIcon />
          </Tooltip>
        ) : null}
      </Flex>
    ),
    tracking: (
      <Flex flexDirection={"column"} gap={"8px"}>
        <Flex
          gap={"4px"}
          onClick={() => {
            navigator.clipboard.writeText(order?.tracking_code);
            notificationSuccess("Copied");
          }}
        >
          <Tooltip title={"Click to copy"} placement={"bottom"}>
            <Typography text={order?.tracking_code} />
          </Tooltip>
          {order?.purchase_type === "buy_for_me" ? (
            <Tooltip title={"Buy for me"} placement={"bottom"}>
              <BfmIcon />
            </Tooltip>
          ) : null}
        </Flex>
        {order?.customer_comment ? (
          <Typography text={order?.customer_comment} color="#5B6D7F" />
        ) : null}
        {order?.dangerous ? (
          <Tooltip placement={"top"} title={"Dangerous"}>
            <AlertCircleIcon />
          </Tooltip>
        ) : null}
      </Flex>
    ),
    weight: (
      <Tooltip title={"Weight"} placement={"bottom"}>
        <Typography text={`${order?.weight} kg`} />
      </Tooltip>
    ),
    price: (
      <Flex flexDirection={"column"} gap={"4px"}>
        <Flex>
          <Typography text={`${order?.cost}  $`} padding="0 7px 0 0" />
          {order?.additional_cost ? (
            <Tooltip title={"Add cost"} placement={"bottom"}>
              <Typography
                text={order?.additional_cost + " $"}
                color={"#8E9BA7"}
                fontSize={"14px"}
              />
            </Tooltip>
          ) : null}
        </Flex>
        {!order?.declaration_price ? (
          <Typography text="Not declared" color="#FC4447" />
        ) : (
          <Typography
            text={`${
              order?.declaration_price
                ? order?.declaration_price + " " + order?.declaration_currency
                : ""
            } `}
            color="#5B6D7F"
          />
        )}
      </Flex>
    ),
    status: (
      <div>
        <Flex flexWrap={"nowrap"} gap={"5px"}>
          <OrderStatusIcon status={order?.status} />
          <Flex>
            <Typography
              text={orderStatusTexts[order?.status]}
              color="#5B6D7F"
            />
            <Tooltip
              title={order?.histories[order?.histories?.length - 1]?.date}
              placement={"bottom"}
            >
              <Typography
                text={
                  order?.histories?.length > 0
                    ? dayjs(
                        order?.histories[order?.histories?.length - 1]?.date,
                      ).format("DD.MM.YYYY")
                    : ""
                }
              />
            </Tooltip>
          </Flex>
        </Flex>
        <Flex alignItems="center" padding={"10px 0 0 0"}>
          <Flex>
            {order?.status === "in_georgia" ? (
              <Flex gap={"5px"}>
                {order?.ready_for_pickup ? (
                  <>
                    <ReadyIcon />
                    <Typography text={`Ready`} color="#5dba2f" />
                  </>
                ) : order?.custom?.custom_status?.status === "double_check" ? (
                  <Typography text={`Double Check`} color="#FC4447" />
                ) : order?.custom?.custom_tax_id?.id ? (
                  <Typography text={`Tax occurred`} color="#FC4447" />
                ) : order?.custom?.declaration_group_id ? (
                  <Typography text={`Need declaration`} color="#FC4447" />
                ) : order?.custom ? (
                  <Typography text={`In customs`} color="#FC4447" />
                ) : (
                  <Typography text={`Not Ready`} color="#FC4447" />
                )}
              </Flex>
            ) : (
              <Flex gap={"5px"} flexWrap={"nowrap"}>
                <EstimateIcon />
                <Flex flexDirection={"column"}>
                  <Typography text={`Estimated`} color="#5B6D7F" />
                  <Typography
                    text={
                      order?.estimated_date_to
                        ? dayjs(order?.estimated_date_to).format("DD.MM.YYYY")
                        : ""
                    }
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
        {!!order.service && (
          <Flex alignItems="center">
            <img src={order?.service?.smart_service.image} width="25" />
            <Flex alignItems="center" gap={"8px"}>
              <Typography
                text={
                  order?.service?.smart_service?.current_smart_service?.name ||
                  ""
                }
                color="#5B6D7F"
              />
              <Tag
                text={order?.service?.status || ""}
                background="#EDFBFE"
                color="#47BFE1"
              />
            </Flex>
          </Flex>
        )}
      </div>
    ),
    pickup_point: (
      <>
        <Typography text={order?.pickup_point?.name} />
        {order?.delivery && order?.delivery?.type === "home" ? (
          <Flex gap={"8px"}>
            <DeliveryIcon />
            <Typography text={"Home delivery"} />
            <Tooltip
              placement={"top"}
              title={`${order?.delivery?.delivery_home?.delivery_date}`}
            >
              <InfoIcon />
            </Tooltip>
          </Flex>
        ) : (
          ""
        )}
      </>
    ),
    eye: PermissionFinder(permissions, "order-view") ? (
      <EyeIcon
        onClick={() => {
          setDetailsStatus(true);
          setId(order.id);
        }}
      />
    ) : (
      ""
    ),
  }));

  return (
    <div className={"table_wrapper_without_head"}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isLoading}
        scroll={{ y: "60vh" }}
        summary={() => (
          <Table.Summary fixed={"bottom"}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={24}>
                <Typography
                  fontSize={"16px"}
                  text={`Cost: ${meta?.options?.total_cost}  $ |  Add.Cost: ${meta?.options?.total_additional_cost}  $ |  V Weight: ${meta?.options?.total_v_weight} |  Weight: ${meta?.options?.total_weight}`}
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />

      <div className={"new-pagination"}>
        <PrimaryButton
          text="Excel"
          onClick={() => handleDownloadExcel()}
          icon={<DownloadIcon color={"#ffffff"} />}
          margin={"16px auto 0 0"}
        />
        <Pagination
          total={meta?.total || 1}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={(page) => setFilters({ ...filters, page })}
          // defaultPagefontSize={meta?.per_page || 15}
          defaultCurrent={meta?.current_page || 1}
        />
      </div>
    </div>
  );
}
