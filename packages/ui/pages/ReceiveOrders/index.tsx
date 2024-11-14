import { useState } from "react";
import useGetOrders from "@repo/ui/hooks/orders/useGetOrders.hook";
import ReceiveTopActions from "./TopActions";
import ReceivedUserInfo from "./UserInfo";
import { Loader } from "@repo/ui/components/loader/Loader";
import ReceivedTable from "./Table";
import { NotFound } from "@repo/ui/components/table/NotFound";
import ModalRefillBalance from "./ModalRefillBalance";
import NotFoundReceivedIcon from "@repo/ui/assets/icons/NotFoundReceivedIcon";
import { SearchCircleIcon } from "@repo/ui/assets/icons/SearchCircleIcon";
import { Recipient } from "@repo/types/src/prime-users-type";

export default function ReceiveOrders() {
  const permissions =
    JSON.parse(localStorage.getItem("permissions") || "") || {};
  const [user, setUser] = useState<null | Recipient>(null);
  const [fillBalanceStatus, setFillBalanceStatus] = useState(false);
  const [filters, setFilters] = useState<Record<
    string,
    string | number | undefined | boolean
  > | null>(null);
  const { orders, isLoading, meta, refetch } = useGetOrders(filters);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full ">
      <h1 className="text-title mb-[24px]">Receive orders</h1>
      <ReceiveTopActions
        setFilters={setFilters}
        setUser={setUser}
        loading={isLoading}
      />
      {!!user && (
        <ReceivedUserInfo
          setFillBalanceStatus={setFillBalanceStatus}
          user={user}
        />
      )}
      {isLoading ? (
        <Loader style={{ marginTop: "16px" }} />
      ) : orders?.length > 0 ? (
        <ReceivedTable
          orders={orders}
          meta={meta}
          id={user?.user?.id}
          refetch={refetch}
          setFilter={setFilters}
          permissions={permissions}
          handleSetUser={(val) => {
            if (user) {
              setUser({
                ...user,
                user: val,
              });
            }
          }}
        />
      ) : (
        <NotFound
          icon={filters ? <SearchCircleIcon /> : <NotFoundReceivedIcon />}
          text={
            filters
              ? "User don’t have orders ready to pick up"
              : "Here you can find information about received orders"
          }
        />
      )}

      <ModalRefillBalance
        user={user?.user}
        handleSetUser={(val) => {
          if (user) {
            setUser({
              ...user,
              user: val,
            });
          }
        }}
        fillBalanceStatus={fillBalanceStatus}
        setFillBalanceStatus={setFillBalanceStatus}
      />
    </div>
  );
}
