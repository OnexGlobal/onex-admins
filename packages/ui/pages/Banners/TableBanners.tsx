import { Meta } from "@repo/types";
import { BannersType, LanguagesType } from "@repo/types/src/marketing-content";
import { Pagination, Tag } from "antd";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { EditIcon } from "../../assets/icons/EditIcon";
import Table from "../../components/table/Table";

interface Props {
  data: BannersType[];
  setBanner: Dispatch<SetStateAction<boolean | BannersType>>;
  setFilters: Dispatch<SetStateAction<object>>;
  meta: Meta;
  languages: LanguagesType[];
  header_message_edit?: boolean;
}

const TableBanners: FC<Props> = ({
  data = [],
  setBanner = () => {},
  setFilters = () => {},
  meta,
  languages,
  header_message_edit,
}) => {
  const columns = [
    {
      key: "sort",
      dataIndex: "sort",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Updated date",
      dataIndex: "updated_date",
      key: "updated_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: " ",
      dataIndex: "edit",
      key: "edit",
    },
  ];
  const newData = data?.map((el, i) => ({
    key: el?.id || i,
    sort: el?.id,
    title: (
      <div
        dangerouslySetInnerHTML={{ __html: el?.text || "" }}
        className="text-[14px] text-oxford-blue-200 font-[500] flex gap-[6px]"
      />
    ),
    language: (
      <div className="flex gap-[10px]">
        {languages?.length > 0
          ? languages?.map((ml, index) => (
              <img
                alt={ml.code}
                key={ml.id}
                onClick={() => setBanner({ ...el, language_id: index + 1 })}
                src={ml.flag}
                style={{
                  opacity: el?.details?.find((d) => d.language_id === ml.id)
                    ? "1"
                    : ".3",
                  cursor: "pointer",
                }}
                width="24"
              />
            ))
          : ""}
      </div>
    ),

    created_date: (
      <div className="flex gap-[4px]">
        <span>
          {el?.created_at
            ? dayjs(el?.created_at).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-200">
          {el?.created_at ? dayjs(el?.created_at).format("HH:mm") : ""}
        </span>
      </div>
    ),
    updated_date: (
      <div className="flex gap-[4px]">
        <span>
          {el?.updated_at
            ? dayjs(el?.updated_at).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-200">
          {el?.updated_at ? dayjs(el?.updated_at).format("HH:mm") : "-"}
        </span>
      </div>
    ),
    status: (
      <Tag color={el?.is_active ? "green" : "red"}>
        {el?.is_active ? "Active" : "Inactive"}
      </Tag>
    ),
    edit: header_message_edit ? (
      <EditIcon style={{ cursor: "pointer" }} onClick={() => setBanner(el)} />
    ) : null,
  }));

  return (
    <div className={"table_wrapper"}>
      <Table
        bordered
        dataSource={newData}
        meta={meta}
        columns={columns}
        onChangePage={(page) =>
          setFilters((pre) => ({
            ...pre,
            page,
          }))
        }
        onChangePerPage={(per_page) =>
          setFilters((pre) => ({
            ...pre,
            per_page,
          }))
        }
      />
    </div>
  );
};
export default TableBanners;
