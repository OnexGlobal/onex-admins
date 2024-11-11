import { Meta } from "@repo/types";
import { Tag } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ActionsHistoryType } from "@repo/types/src/actions-history";
import dayjs from "dayjs";
import Table from "../../components/table/Table";
interface Props {
  meta: Meta;
  actionList: ActionsHistoryType[];
  setFilter: Dispatch<SetStateAction<object>>;
}

export const TableActions: FC<Props> = ({ setFilter, actionList, meta }) => {
  const [see, setSee] = useState(-1);
  const columns = [
    {
      title: "Changed by",
      dataIndex: "changed_by",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Type ID",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
    {
      title: "Updated date",
      dataIndex: "updated_date",
      key: "updated_date",
    },
  ];
  const dataSource = actionList?.map((el, i: number) => {
    const str = el?.log_name?.split(" ")?.pop() || "";

    const subject_type = el?.subject_type?.split("\\")?.pop() || "";

    const desc = !el?.properties?.old
      ? ""
      : Object.entries(el?.properties?.old).map(([key, val], i) => {
          const to = el?.properties?.attributes?.[key] || "";
          const info = ` ${key?.replaceAll("_", " ")} changed from ${
            val || "0.00"
          } to ${to || "0.00"}.`;

          return (
            <div className="flex gap-[8px]" key={i + "to-info"}>
              <span className="text-[12px] text-oxford-blue-300">
                {subject_type}
              </span>
              <span className="text-[12px]">{info}</span>
            </div>
          );
        });
    return {
      key: i,
      changed_by: (
        <div className="flex flex-col">
          <span>{el?.causer?.user_info}</span>
          <Tag color={str === "admin" ? "blue" : "orange"}>{str}</Tag>
        </div>
      ),
      type: el?.morph_to?.model ? (
        <Tag color="blue">{el?.morph_to?.model}</Tag>
      ) : (
        ""
      ),
      type_id: el?.subject_id,
      description: (
        <>
          <div
            className="flex flex-col transition-all overflow-hidden"
            style={{
              maxHeight: see === i ? 800 : 20,
              overflow: "hidden",
            }}
          >
            {desc}
          </div>
          {desc?.length < 1 ? (
            ""
          ) : see === i ? (
            <span
              className="text-green-500 text-[12px] cursor-pointer"
              onClick={() => setSee(-1)}
            >
              See less
            </span>
          ) : (
            <span
              className="text-green-500 text-[12px] cursor-pointer"
              onClick={() => setSee(i)}
            >{`See more ${desc?.length} items`}</span>
          )}
        </>
      ),
      actions: (
        <Tag
          color={
            el?.event === "updated"
              ? "blue"
              : el?.event === "created"
                ? "green"
                : "red"
          }
        >
          {el?.event}
        </Tag>
      ),
      updated_date: (
        <div className="flex">
          <span>
            {el?.created_at
              ? dayjs(el?.created_at).format("DD.MM.YYYY") + ","
              : ""}
          </span>
          <span className="ml-[4px] text-oxford-blue-200">
            {el?.created_at ? dayjs(el?.created_at).format("HH:mm") : ""}
          </span>
        </div>
      ),
    };
  });
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      meta={meta}
      onChangePage={(page) => setFilter((p) => ({ ...p, page }))}
      onChangePerPage={(per_page) => setFilter((p) => ({ ...p, per_page }))}
    />
  );
};
