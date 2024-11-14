import { Button, Input, Tabs, Tag } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import ReceiveTableContent from "./ReceiveTableContent";
import { useReceiveOrders } from "@repo/ui/hooks/receive-orders/useReceiveOrders.hook";
import { OrderData } from "@repo/types/src/orders";
import { Permissions } from "@repo/types/src/permissions";
import { Recipient } from "@repo/types/src/prime-users-type";
import { DeactivateModal } from "@repo/ui/components/modals/DeactivateModal";
import { MetaType } from "@repo/types/src/meta-type";
import { Refetch, Users } from "@repo/types";

const { Search } = Input;

interface Props {
  orders: OrderData[];
  id?: number;
  handleSetUser: (val: Recipient["user"]) => void;
  permissions: Permissions["order"];
  meta: MetaType;
  refetch: Refetch;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined | boolean> | null>
  >;
}

export default function ReceivedTable({
  orders,
  id,
  handleSetUser,
  refetch,
  meta,
  setFilter,
}: Users.CustomersTableType & Props) {
  const [ordersData, setOrdersData] = useState(orders || []);
  const [receiveModalStatus, setReceiveModalStatus] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [tabKey, setTabKey] = useState("All");
  const [searchTracking, setSearchTracking] = useState("");
  const checkedData = orders?.filter(function (item) {
    return selectedRowKeys?.length > 0
      ? selectedRowKeys?.includes(item?.id)
      : false;
  });
  const uncheckedData = orders?.filter(function (item) {
    return selectedRowKeys?.length > 0
      ? !selectedRowKeys?.includes(item?.id)
      : true;
  });
  const onChange = (key: string) => {
    setTabKey(key);
    if (+key === 1) {
      setTabKey("All");
      setOrdersData(orders);
    } else if (+key === 2) {
      setTabKey("Checked");
      setOrdersData(checkedData);
    } else if (+key === 3) {
      setTabKey("Unchecked");
      setOrdersData(uncheckedData);
    }
  };
  const handleSearchByTracking = (key: number) => {
    if (key === 13) {
      if (searchTracking) {
        const searchData = orders?.find((el) => {
          return el?.tracking_code
            ?.toString()
            .toLocaleUpperCase()
            .includes(searchTracking.toString().toLocaleUpperCase());
        });
        if (searchData) {
          setSelectedRowKeys([...selectedRowKeys, searchData?.id]);
        }
      }
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-[8px]">
          All
          <Tag className="text-green-500 bg-green-50">
            {orders?.length || "0"}
          </Tag>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-[8px]">
          Checked
          <Tag className="text-green-500 bg-green-50">
            {checkedData?.length || "0"}
          </Tag>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex gap-[8px]">
          Unchecked
          <Tag className="text-green-500 bg-green-50">
            {uncheckedData?.length || "0"}
          </Tag>
        </div>
      ),
    },
  ];
  const { mutate: receiveOrders } = useReceiveOrders(
    (res) => {
      notificationSuccess("Receive orders", "successful");
      handleSetUser(res?.data?.data as Recipient["user"]);
      refetch();
      setReceiveModalStatus(false);
    },
    (e) => {
      setReceiveModalStatus(false);
      notificationError(
        "Receive orders",
        `${
          e?.response?.data?.message
            ? "Insufficient balance, please check customer balance."
            : e?.response?.data?.data?.order_ids[0]
            ? e?.response?.data?.data?.order_ids[0]
            : "something went wrong"
        } `
      );
    }
  );
  const handleReceive = async () => {
    if (!selectedRowKeys.length) {
      notificationError("Receive orders", "no order selected");
      return;
    }
    if (id) receiveOrders({ id: id, order_ids: selectedRowKeys });
  };
  return (
    <>
      <div className="flex w-full items-center gap-[16px]">
        <Search
          className={"search_btn"}
          enterButton="Check"
          placeholder="Tracking code"
          onSearch={() => handleSearchByTracking(13)}
          onChange={(e) => setSearchTracking(e.target.value)}
          onKeyDown={(e) => handleSearchByTracking(e.keyCode)}
          style={{ width: 330 }}
        />

        <Tabs
          items={items}
          onChange={onChange}
          defaultActiveKey="1"
          style={{ width: "calc(100% - 580px" }}
        />

        <Button
          className="ml-auto"
          type="primary"
          onClick={() => setReceiveModalStatus(true)}
          disabled={!selectedRowKeys.length}
        >
          Receive selected orders
        </Button>
      </div>
      <ReceiveTableContent
        tabKey={tabKey}
        orders={ordersData}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        totalPrice={meta.options?.total_cost}
        totalWeight={meta.options?.total_weight}
        meta={meta}
        setFilter={setFilter}
      />
      <DeactivateModal
        deactivate={receiveModalStatus}
        setDeactivate={setReceiveModalStatus}
        useDeactivate={handleReceive}
        title={"Receive orders"}
        description={"Are you sure you want to make orders status receive"}
        action={"Receive"}
      />
    </>
  );
}
