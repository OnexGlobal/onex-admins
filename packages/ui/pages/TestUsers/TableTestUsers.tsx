import { Permissions, Refetch } from "@repo/types";
import { UserType } from "@repo/types/src/users";
import { FC, useState } from "react";
import { deleteTestUserHook } from "../../hooks/testusers/deleteTestUser.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../components/alerts/notification";
import { clearTestUserData } from "../../hooks/testusers/clearTestUserData";
import dayjs from "dayjs";
import { Button, Table } from "antd";
import { DeleteModal } from "../../components/alerts/DeleteModal";
import { order_icon } from "../../assets/images/prime";
import prime from "../../assets/images/prime.svg";

interface Props {
  page: number;
  usersList: UserType[];
  reFetch: Refetch;
}

export const TableTestUsers: FC<Props> = ({
  usersList,
  reFetch = () => {},
  page = 1,
}) => {
  const permissions =
    JSON.parse(localStorage.getItem("permissions") || "") || {};
  const actionAvailable = (str: string) => {
    const test_users: Permissions["test-users"] = permissions["test-user"];
    if (!test_users) return false;
    return test_users.some((item) => item.name === str);
  };

  const [isDelete, setIsDelete] = useState(false);
  const [testUser, setTestUser] = useState<null | number[]>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { mutate: deleteUsers } = deleteTestUserHook({
    onSuccess: () => {
      notificationSuccess("Delete Test User", "Test User successfully deleted");
      reFetch();
      setIsDelete(false);
      setTestUser(null);
      setSelectedUsers([]);
    },
    onError: () => {
      notificationError("Delete Test User", "something went wrong");
    },
  });

  const { mutate: clearData } = clearTestUserData({
    onSuccess: () => {
      notificationSuccess("Delete Test User", "Test User successfully deleted");
      reFetch();
      setIsDelete(false);
    },
    onError: () => {
      notificationError("Delete Test User", "something went wrong");
    },
  });
  const deleteTestUser = (ids: number[]) => {
    deleteUsers({ ids: ids });
  };
  const clearTestUserRelations = (ids: number[]) => {
    clearData(ids);
  };
  const columns = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "name",
    },
    {
      title: "Total orders",
      dataIndex: "total_orders",
      key: "total_orders",
      sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      width: "200px",
    },

    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
      sorter: (a: { created: string }, b: { created: string }) =>
        new Date(a.created).getTime() - new Date(b.created).getTime(),
    },
    {
      title: " ",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource = usersList?.map((el, i) => ({
    key: i,
    count: el?.orders_count,
    created: el?.created_et,
    id: el?.id,
    full_name: (
      <div className="flex">
        <span className="text-[14px] text-oxford-blue-300">
          {i + (page - 1) * 15 + 1}
        </span>
        <span className="text-[14px] text-oxford-blue-300 mx-[16px]">
          {el?.full_name + " " + el?.recipient?.user_code || ""}
        </span>
        <img alt={"prime"} src={prime} />
      </div>
    ),
    orders: (
      <div className="flex">
        {el?.orders_count_by_country?.length
          ? el?.orders_count_by_country?.map((item, index) => (
              <div className="flex items-center ml-[8px]" key={index}>
                <img
                  alt={`country${index}`}
                  width={24}
                  height={24}
                  src={`https://devbackadmin.onex.ge/storage/images/warehouses/${item?.round_flag}`}
                />
                <span className="font-[400] text-[14px] ml-[8px] text-oxford-blue-300">
                  {item?.total}
                </span>
              </div>
            ))
          : "-"}
      </div>
    ),
    total_orders: (
      <div className="flex items-center ml-[8px]">
        <img alt={"order"} src={order_icon} />
        <span className="font-[400] text-[14px] ml-[8px] text-oxford-blue-300">
          {el?.orders_count}
        </span>
      </div>
    ),
    created_date: (
      <span className="text-[14px] text-black">
        {el?.created_et ? dayjs(el?.created_et).format("DD.MM.YYYY") : ""}
      </span>
    ),
    actions: (
      <div className="flex items-cener gap-[12px]">
        {actionAvailable("test-user-relations-delete") ? (
          <Button
            type="default"
            danger
            onClick={() => clearTestUserRelations([el?.id])}
          >
            Clear data
          </Button>
        ) : (
          <></>
        )}
        {actionAvailable("test-user-delete") ? (
          <Button
            type="primary"
            danger
            onClick={(e) => {
              setIsDelete(true);
              setTestUser([el?.id]);
              e.stopPropagation();
            }}
          >
            Delete user
          </Button>
        ) : (
          <></>
        )}
      </div>
    ),
  }));

  return (
    <div className="flex flex-col justify-between">
      <DeleteModal
        deleted={isDelete}
        title={"Delete Test user"}
        setDeleted={setIsDelete}
        description={"Are you sure you want to delete test user"}
        handleDelete={() => deleteTestUser(testUser ? testUser : selectedUsers)}
      />
      {selectedUsers?.length ? (
        <div className="flex items-center justify-end gap-[12px] mb-[16px] w-full">
          {actionAvailable("test-user-relations-delete") ? (
            <Button
              type="default"
              danger
              onClick={() => clearTestUserRelations(selectedUsers)}
            >
              Clear data
            </Button>
          ) : (
            <></>
          )}
          {actionAvailable("test-user-delete") ? (
            <Button
              type="primary"
              danger
              onClick={(e) => {
                setIsDelete(true);
                e.stopPropagation();
              }}
            >
              Delete user
            </Button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ width: "100%" }}
        rowSelection={{
          onChange: (_, selectedRowsArray) => {
            setSelectedUsers(selectedRowsArray.map((item) => item.id));
          },
        }}
      />
    </div>
  );
};
