import { Paginated, PrimeUser, Status } from "@repo/types";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useUpdatePrimeUserStatus } from "../../hooks/customers/updatePrimeUserStatus.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../components/alerts/notification";
import PrimeIcon from "../../assets/icons/PrimeIcon";
import dayjs from "dayjs";
import TrashIcon from "../../assets/icons/TrashIcon";
import { DeleteModal } from "../../components/modals/DeleteModal";
import Table from "../../components/table/Table";

interface Props {
  usersList: PrimeUser.PrimeUserType[];
  meta: Paginated<PrimeUser.PrimeUserType[]>["meta"];
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined | null>>
  >;
  refetch: () => void;
}

export const PrimeUserTable: FC<Props> = ({
  usersList,
  meta,
  setFilter,
  refetch,
}) => {
  const [deleteId, setDeleteId] = useState<Status>(false);
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Recipients",
      dataIndex: "recipients",
      key: "recipients",
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: " ",
      dataIndex: "trash",
      key: "trash",
      width: "50px",
    },
  ];
  const { mutate } = useUpdatePrimeUserStatus(
    () => {
      notificationSuccess("Delete Prime", "Prime successfully deleted");
      refetch();
      setDeleteId(false);
    },
    () => {
      notificationError("Delete Prime", "something went wrong");
    }
  );
  const dataSource = usersList?.map((PU, i) => ({
    key: i,
    full_name: (
      <div className="flex items-center gap-[16px]">
        <span className="text-[14px]">{PU?.label}</span>
        <PrimeIcon />
      </div>
    ),
    email: PU?.email,
    phone: PU?.phone,
    recipients: PU?.recipients?.length || "0",
    created_date: (
      <div>
        <span className="16px">
          {PU?.created_et ? dayjs(PU?.created_et).format("DD.MM.YYYY") : ""}
        </span>
        <span className="text-[16px] text-oxford-blue-200">
          {PU?.created_et ? ", " + dayjs(PU?.created_et).format("HH:mm") : ""}
        </span>
      </div>
    ),
    trash: <TrashIcon onClick={() => setDeleteId(PU?.id)} />,
  }));
  return (
    <>
      <Table
        bordered
        meta={meta}
        onChangePage={(page) => setFilter((p) => ({ ...p, page }))}
        dataSource={dataSource}
        columns={columns}
      />
      <DeleteModal
        deletedId={deleteId}
        title={"Delete prime"}
        description={"Are you sure you want to delete prime"}
        deleted={deleteId}
        setDeleted={setDeleteId}
        handleDelete={(val) => mutate(val as Record<string, string>)}
      />
    </>
  );
};
