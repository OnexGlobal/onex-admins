import { useState } from "react";
import useGetFailedOrders from "@repo/ui/hooks/orders/useGetFailedOrders.hook";
import OrdersFailedTopActions from "./TopActions";
import FailedOrdersTable from "./TableFailed";
import { Loader } from "@repo/ui/components/loader/Loader";

export default function OrdersFailed() {
  const [filters, setFilters] = useState({});
  const { failedOrders, meta, isLoading } = useGetFailedOrders(filters);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full p-0">
      <h1 className="text-title mb-[24px]">Failed orders</h1>
      <OrdersFailedTopActions setFilters={setFilters} />
      {isLoading ? (
        <Loader />
      ) : (
        <FailedOrdersTable
          meta={meta}
          isLoading={isLoading}
          orders={failedOrders}
          setFilter={setFilters}
        />
      )}
    </div>
  );
}
