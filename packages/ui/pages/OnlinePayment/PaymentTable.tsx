import { RefundType } from "@repo/types/src/online-payment";
import { Button, Tooltip } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useOnlinePaymentList } from "../../hooks/online-payment/useFetchOnlinePaymen.hook";
import dayjs from "dayjs";
import { RefundedIcon } from "../../assets/icons/RefundedIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { onlinePaymentApi } from "../../services/online-payment";
import Table from "../../components/table/Table";

interface Props {
  setRefund: Dispatch<SetStateAction<RefundType>>;
  filterData: Record<string, string | number>;
  setFilterData: Dispatch<SetStateAction<Record<string, string | number>>>;
}

export const PaymentTable = ({
  setRefund,
  filterData,
  setFilterData,
}: Props) => {
  const {
    paymentList = [],
    meta,
    isLoading,
  } = useOnlinePaymentList(filterData);

  const dataSource = paymentList?.map((pay, i) => ({
    key: i,
    order_id: (
      <span className="text-green-500 text-[14px]">{pay?.order_id}</span>
    ),
    transaction_id: pay?.transaction_id,
    full_name:
      (pay?.user?.recipient?.first_name || "") +
      " " +
      (pay?.user?.recipient?.last_name || "") +
      " " +
      (pay?.user?.recipient?.user_code || ""),
    card_no: pay?.payer_identifier ? pay?.payer_identifier?.slice(-4) : "",
    date: (
      <div className="flex gap-[5px]">
        <span className="text-[14px]">
          {" "}
          {pay?.create_date
            ? dayjs(pay?.create_date).format("DD.MM.YYYY,")
            : ""}
        </span>
        <span className="text-oxford-blue-200 text-[14px]">
          {pay?.create_date ? dayjs(pay?.create_date).format("HH:ss") : ""}
        </span>
      </div>
    ),
    amount: pay?.request_amount,
    status: "Payment " + pay?.status || "",
    description: (
      <Tooltip placement="bottom" title={"Approved: Payment post authorized"}>
        <span className="text-[14px]">{pay?.reject_reason}</span>
      </Tooltip>
    ),
    approved: pay?.transfer_amount,
    deposit: +pay?.request_amount - +pay?.refund_amount || "",
    refunded: (pay?.refund_amount || "") + import.meta.env.VITE_APP_CURRENCY,
    action: (
      <Tooltip title={"Refund to customer card"} placement="bottomRight">
        <RefundedIcon cursor={"pointer"} onClick={() => setRefund(pay)} />
      </Tooltip>
    ),
  }));

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      width: 200,
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
      width: 250,
    },
    {
      title: "Card no.",
      dataIndex: "card_no",
      key: "card_no",
      width: 80,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Response state",
      dataIndex: "status",
      key: "status",
      width: 180,
    },
    {
      title: "Response description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
    },
    {
      title: "Refunded",
      dataIndex: "refunded",
      key: "refunded",
      width: 90,
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      width: 50,
    },
  ];
  return (
    <>
      <div className={"table_wrapper"}>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          meta={meta}
          bordered
          onChangePage={(page) => {
            setFilterData((p) => ({
              ...p,
              page,
            }));
          }}
          onChangePerPage={(value) =>
            setFilterData((p) => ({ ...p, per_page: value }))
          }
        />
      </div>
      <div className={"new-pagination"}>
        <Button
          icon={<DownloadIcon />}
          type={"default"}
          onClick={() => onlinePaymentApi.exportExelList(filterData)}
        >
          Excel
        </Button>
      </div>
    </>
  );
};
