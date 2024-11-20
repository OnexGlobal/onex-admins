import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { BonusDataType } from "@repo/types/src/bonus";
import { Meta } from "@repo/types";
import dayjs from "dayjs";
import Table from "../../components/table/Table";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { bonusApi } from "../../services/bonus";

interface Props {
  params: Record<string, string>;
  setFilterData: Dispatch<SetStateAction<object>>;
  bonusList: BonusDataType[];
  meta: Meta;
}

export default function BonusTable({
  params,
  setFilterData,
  bonusList,
  meta,
}: Props) {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: " ",
      width: "50px",
    },
    {
      key: "user_code",
      dataIndex: "user_code",
      title: "Full name",
    },
    {
      key: "bonus_type",
      dataIndex: "bonus_type",
      title: "Bonus type",
    },
    {
      key: "bonus_amount",
      dataIndex: "bonus_amount",
      title: "Bonus amount",
    },
    {
      key: "given_date",
      dataIndex: "given_date",
      title: "Given date",
    },
    {
      key: "expire_date",
      dataIndex: "expire_date",
      title: "Expire date",
    },
  ];

  const dataSource = bonusList?.map((list, i) => ({
    key: i,
    id: i + 1,
    user_code:
      (list?.user?.full_name || "") +
      " " +
      (list?.user?.recipient?.user_code || ""),
    bonus_type: (
      <span className="capitalize text-[14px]">
        {list?.bonus_type?.current_bonus_type?.name}
      </span>
    ),
    bonus_amount: (
      <span
        className={`font-[500] ${
          list?.type === "in" ? "text-green-500" : "text-red-500"
        }`}
      >
        {list?.sum && list?.type === "in"
          ? list?.sum + " " + import.meta.env.VITE_APP_CURRENCY
          : -list?.sum + " " + import.meta.env.VITE_APP_CURRENCY}
      </span>
    ),

    given_date: (
      <div className="flex">
        <span className="text-[14px] font-[400] text-green-500">
          {list?.given_date
            ? dayjs(list?.given_date).format("DD.MM.YYYY ,")
            : ""}
        </span>
        <span className="text-oxford-blue-300 text-[14px] font-[400]">
          {list?.given_date ? dayjs(list?.given_date).format("HH:MM") : ""}
        </span>
      </div>
    ),
    expire_date: (
      <div className="flex">
        <span>
          {list?.expire_date
            ? dayjs(list?.expire_date).format("DD.MM.YYYY ,")
            : ""}
        </span>
        <span className="text-oxford-blue-300">
          {list?.expire_date ? dayjs(list?.expire_date).format("HH:MM") : ""}
        </span>
      </div>
    ),
  }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        meta={meta}
        bordered
        onChangePage={(page) => setFilterData((p) => ({ ...p, page }))}
        onChangePerPage={(value) =>
          setFilterData((p) => ({ ...p, per_page: value }))
        }
      />
      <div className="flex gap-[8px] justify-end">
        <span>Total bonus amount</span>
        <span className="text-oxford-blue-300">
          {meta?.options?.total_sum || ""} v
        </span>
      </div>
      <Button
        type="default"
        className="mt-[10px] "
        icon={<DownloadIcon />}
        onClick={() => bonusApi.exportExelList(params?.user_id || null)}
      >
        {params?.user_id ? "Excel" : "Excel All"}
      </Button>
    </>
  );
}
