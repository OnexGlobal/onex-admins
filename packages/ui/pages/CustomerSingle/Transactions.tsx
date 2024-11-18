import { Table } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useGetTransactions from "../../hooks/customers/useGetTransactions.hook";
import { TransactionsTypes } from "@repo/types/src/transactions-types";
import InputIcon from "../../assets/icons/InputIcon";
import OutputIcon from "../../assets/icons/OutputIcon";
import { Loader } from "../../components/loader/Loader";
export default function CustomerSingleTransactions() {
  const { id } = useParams();
  const { transactions } = useGetTransactions(id);
  const columns = [
    {
      key: "orderId",
      dataIndex: "orderId",
      title: "Order ID",
      width: "8%",
      // render(_, record) => ()
    },
    {
      key: "inout",
      dataIndex: "inout",
      title: "In/Out",
      width: "15%",
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: "15%",
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      width: "28%",
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
    },
  ];

  let dataSource = null;

  dataSource = transactions?.map(
    (transaction: TransactionsTypes, index: number) => ({
      id: transaction.id,
      key: index,
      orderId: (
        <span className="text-green-500 text-[14px]">
          {transaction.order_id}
        </span>
      ),
      inout:
        transaction.type === "in" ? (
          <div className="flex items-center">
            <InputIcon />
            <span className="text-green-500 text-[14px] ml-[10px]">
              {transaction?.comment}
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <OutputIcon />{" "}
            <span className="text-green-500 text-[14px] ml-[10px]">
              {transaction?.comment}
            </span>
          </div>
        ),
      type: (
        <span className="text-green-500 text-[14px] ml-[10px]">
          {transaction?.balance_payment_type?.name || "Visa Card"}
        </span>
      ),
      //pr
      amount: (
        <span className="text-green-500 text-[14px] ml-[10px]">
          {`${transaction.sum} ${import.meta.env.VITE_APP_CURRENCY || ""}`}
        </span>
      ),
      date: (
        <div className="flex ">
          <span className="text-green-500 text-[14px] ml-[10px]">
            {dayjs(transaction?.created_at).format("YYYY-MM-DD") ||
              "11.12.2022"}
          </span>
          <span className="text-oxford-blue-200 text-[14px] ml-[5px]">
            {dayjs(transaction.created_at).format("HH:mm:ss")}
          </span>
        </div>
      ),
    })
  );

  return (
    <div className={"table_wrapper"}>
      {transactions ? (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1200, y: 350 }}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
