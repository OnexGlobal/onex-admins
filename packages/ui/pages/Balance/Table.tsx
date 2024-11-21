import { Button, DatePicker, Form, Input } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { BalancesList } from "@repo/types/src/balance";
import { useMutation } from "@tanstack/react-query";
import { notificationSuccess } from "../../components/alerts/notification";
import { balanceApi } from "../../services/balance";
import dayjs from "dayjs";
import InputIcon from "../../assets/icons/InputIcon";
import OutputIcon from "../../assets/icons/OutputIcon";
import CancelIcon from "../../assets/icons/CancelIcon";
import AcceptIcon from "../../assets/icons/AcceptIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { Loader } from "../../components/loader/Loader";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { Meta, Refetch } from "@repo/types";
import Table from "../../components/table/Table";

interface Props {
  params?: { user_id?: string };
  balancesList: BalancesList[];
  meta: Meta;
  isLoading?: boolean;
  refetch: Refetch;
  sumIn?: number;
  sumOut?: number;
  setFilterData: Dispatch<SetStateAction<Record<string, string | number>>>;
  balance_edit: boolean;
}

export default function BalanceTable({
  params,
  balancesList,
  meta,
  isLoading,
  refetch,
  sumIn = 0,
  sumOut = 0,
  setFilterData,
  balance_edit,
}: Props) {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState<boolean | number>(false);
  const { mutate } = useMutation({
    mutationKey: ["update-balance"],
    mutationFn: balanceApi.updateBalance,
    onSuccess: () => {
      notificationSuccess(
        "Balance",
        "Balance information updated successfully"
      );
      setEditable(-1);
      refetch();
    },
  });

  const handleSave = async (id?: number) => {
    const { created_at, ...row } = await form.validateFields();
    mutate({
      id: id,
      created_at: created_at
        ? dayjs(created_at).format("YYYY-MM-DD HH:ss")
        : "",
      ...row,
    });
  };
  const edit = (el?: BalancesList) => {
    if (el?.id) {
      form.setFieldsValue({
        sum: el?.sum,
        created_at: el?.created_at ? dayjs(el?.created_at) : null,
        comment: el?.comment,
      });
      setEditable(el?.id);
    }
  };
  const columns: Record<string, string>[] = [
    {
      key: "orderId",
      dataIndex: "orderId",
      title: "Order ID",
      width: "100px",
    },
    {
      key: "changedBy",
      dataIndex: "changedBy",
      title: "Customer",
      width: "20%",
    },
    {
      key: "inout",
      dataIndex: "inout",
      title: "In/Out",
      width: "80px",
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: "12%",
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      width: "12%",
      rowScope: "row",
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      rowScope: "row",
      width: "15%",
    },
    {
      key: "comment",
      dataIndex: "comment",
      title: "Comment",
      width: "22%",
      rowScope: "row",
    },
    {
      key: "edit",
      dataIndex: "edit",
      title: " ",
      width: "90px",
      rowScope: "row",
    },
  ];
  const dataSource = balancesList?.map((list: BalancesList, i?: number) => ({
    id: 1,
    key: i,
    orderId: <span className="text-green-500">{list?.id}</span>,
    changedBy: (
      <span className="text-black">
        {list?.user?.full_name + " " + list?.user?.recipient?.user_code || ""}
      </span>
    ),
    inout: list?.type === "in" ? <InputIcon /> : <OutputIcon />,
    type: (
      <span className="text-green-500 capitalize">
        {list?.balance_payment_type?.name ||
          list?.balance_transfer_type?.name ||
          ""}
      </span>
    ),
    amount:
      editable === list?.id ? (
        <Form.Item
          style={{ marginBottom: 0 }}
          name={"sum"}
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input suffix={import.meta.env.VITE_APP_CURRENCY} />
        </Form.Item>
      ) : (
        <span
          className={list?.type === "in" ? "text-green-500" : "text-red-500"}
        >
          {list?.sum && list?.type === "in"
            ? list?.sum + import.meta.env.VITE_APP_CURRENCY
            : -list?.sum + import.meta.env.VITE_APP_CURRENCY}
        </span>
      ),
    date:
      editable === list?.id ? (
        <Form.Item
          style={{ marginBottom: 0 }}
          name={"created_at"}
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker format={"DD.MM.YYYY"} inputReadOnly={true} />
        </Form.Item>
      ) : (
        <div className="flex gap-[5px]">
          <span>
            {list?.created_at
              ? dayjs(list?.created_at).format("DD.MM.YYYY,")
              : ""}
          </span>
          <span className="text-oxford-blue-200">
            {list?.created_at ? dayjs(list?.created_at).format("HH:ss") : ""}
          </span>
        </div>
      ),
    comment:
      editable === list?.id ? (
        <Form.Item
          style={{ marginBottom: 0 }}
          name={"comment"}
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input />
        </Form.Item>
      ) : (
        <span className="text-black">{list?.comment || ""}</span>
      ),
    edit:
      editable === list?.id ? (
        <div className="flex gap-[8px] justify-end">
          <CancelIcon onClick={() => setEditable(-1)} />
          <AcceptIcon onClick={() => handleSave(list?.id)} />
        </div>
      ) : (
        <div className="flex justify-end">
          {balance_edit && (
            <Button
              type="default"
              onClick={() => edit(list)}
              icon={<EditIcon />}
            />
          )}
        </div>
      ),
  }));

  if (isLoading) return <Loader />;
  return (
    <Form form={form} className={"table_wrapper"}>
      <Table
        meta={meta}
        bordered
        columns={columns}
        dataSource={dataSource}
        onChangePage={(value) => setFilterData((p) => ({ ...p, page: value }))}
        onChangePerPage={(value) =>
          setFilterData((p) => ({ ...p, per_page: value }))
        }
      />

      <div className="flex justify-end gap-[8px]">
        <span className="text-oxford-blue-300">In</span>{" "}
        <span className="text-oxford-blue-300 font-[500]">
          {sumIn?.toFixed(2)}
        </span>{" "}
        <span className="text-oxford-blue-300">Out</span>{" "}
        <span className="text-oxford-blue-300 font-[500]">
          {-sumOut?.toFixed(2)}
        </span>{" "}
        <span className="text-oxford-blue-300">Balance</span>{" "}
        <span className="text-oxford-blue-300 font-[500]">{`${(
          sumIn - sumOut
        )?.toFixed(2)} ${import.meta.env.VITE_APP_CURRENCY}`}</span>{" "}
      </div>
      <div>
        <Button
          icon={<DownloadIcon />}
          onClick={() => balanceApi.exportExelList(params?.user_id || null)}
        >
          {params?.user_id ? "Excel" : "Excel All"}
        </Button>
      </div>
    </Form>
  );
}
