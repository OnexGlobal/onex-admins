import { Meta, Refetch } from "@repo/types";
import { RolesDataType } from "@repo/types/src/roles-types";
import { Tooltip } from "antd";
import { FC, useState } from "react";
import { useAddNewRole } from "../../hooks/members-and-roles/useAddNewRole.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { PermissionObject } from "@repo/types/src/permissions";
import dayjs from "dayjs";
import { EditIcon } from "../../assets/icons/EditIcon";
import { DuplicateIcon } from "../../assets/icons/DuplicateIcon";
import Table from "../../components/table/Table";
import RoleEditModal from "./RoleEditModal";

interface Props {
  rolesList: [];
  refetchRoles: Refetch;
}

export const RolesTable: FC<Props> = ({ rolesList, refetchRoles }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [editableItem, setEditableItem] = useState<RolesDataType | null>(null);
  const { mutate } = useAddNewRole(
    (res) => {
      notificationSuccess("Role Dublicated", res?.data?.message);
      refetchRoles();
    },
    () => {
      notificationError("Error");
    }
  );

  const handleDublicate = (el: RolesDataType) => {
    const permissions: number[] = [];

    Object.values(el.permissions).forEach((item) => {
      if (Array.isArray(item))
        item.forEach((perm_object: PermissionObject) =>
          permissions.push(perm_object.id)
        );
    });

    mutate({ name: `${el?.name} copy`, permissions });
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: " ",
      dataIndex: "edit",
      key: "edit",
      width: 90,
    },
  ];
  const dataSource = rolesList?.map((rol: RolesDataType, i) => ({
    key: i,
    name: rol?.name,
    users: rol?.users?.length,

    created_date: (
      <div className="flex gap-[4px]">
        <span>
          {rol?.created_at
            ? dayjs(rol?.created_at).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-300">
          {rol?.created_at ? dayjs(rol?.created_at).format("HH:MM") : ""}
        </span>
      </div>
    ),
    edit: (
      <div className="flex gap-[8px]">
        <EditIcon
          onClick={() => {
            setEditableItem(rol);
            setEditStatus(true);
          }}
        />

        <Tooltip title="Dublicate" placement={"bottom"}>
          <DuplicateIcon onClick={() => handleDublicate(rol)} />
        </Tooltip>
      </div>
    ),
  }));
  return (
    <>
      <Table bordered dataSource={dataSource} columns={columns} />
      <RoleEditModal
        status={editStatus}
        setStatus={setEditStatus}
        item={editableItem}
        refetchRoles={refetchRoles}
      />
    </>
  );
};
