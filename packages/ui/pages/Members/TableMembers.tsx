import { Meta } from "@repo/types";
import { Recipient } from "@repo/types/src/users";
import { Tag } from "antd";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { EditIcon } from "../../assets/icons/EditIcon";
import Table from "../../components/table/Table";

interface Props {
  usersList: Recipient[];
  setAddMembers: Dispatch<SetStateAction<Recipient["user"] | boolean>>;
  role_edit: boolean;
  meta?: Meta;
  setQuery: Dispatch<SetStateAction<Record<string, number | string>>>;
}

export const TableMembers: FC<Props> = ({
  usersList,
  setAddMembers,
  role_edit,
  setQuery,
  meta,
}) => {
  const columns = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
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
  const dataSource = usersList?.map((el, i) => ({
    key: i,
    full_name: el?.user?.full_name || "" + " " + el?.user_code || "",
    email: el?.user?.email,
    role: <Tag color="blue">{el?.user?.role?.[0]?.name}</Tag>,
    created_date: (
      <div className="flex gap-[5px]">
        <span>
          {el?.user?.created_et
            ? dayjs(el?.user?.created_et).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-200">
          {el?.user?.created_et
            ? dayjs(el?.user?.created_et).format("HH:MM")
            : ""}
        </span>
      </div>
    ),
    status: (
      <Tag color={el?.user?.is_active_admin ? "success" : "error"}>
        {el?.user?.is_active_admin ? "Active" : "Inactive"}
      </Tag>
    ),
    edit: role_edit ? (
      <EditIcon onClick={() => setAddMembers(el?.user)} />
    ) : null,
  }));
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      meta={meta}
      onChangePage={(value) => setQuery((p) => ({ ...p, page: value }))}
      onChangePerPage={(value) => setQuery((p) => ({ ...p, per_page: value }))}
    />
  );
};
