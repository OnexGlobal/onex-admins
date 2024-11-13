import { useState } from "react";
import OrdersTopActions from "./TopActions";
import OrdersTable from "./Table";
import OrdersDetailsModal from "./DetailsModal";
import useGetOrders from "@repo/ui/hooks/orders/useGetOrders.hook";

export default function Orders() {
  const permissions =
    JSON.parse(localStorage.getItem("permissions") || "") || {};
  const [id, setId] = useState<string>("");
  const [detailsStatus, setDetailsStatus] = useState(false);
  const [filters, setFilters] = useState({});
  const { orders, isLoading, meta } = useGetOrders(filters);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <h1 className="text-title mb-[24px]">Orders</h1>
      <OrdersTopActions setFilters={setFilters} />
      <OrdersTable
        setDetailsStatus={setDetailsStatus}
        id={id}
        setId={setId}
        orders={orders}
        meta={meta}
        setFilters={setFilters}
        filters={filters}
        isLoading={isLoading}
        permissions={permissions}
      />
      <OrdersDetailsModal
        status={detailsStatus}
        setStatus={setDetailsStatus}
        id={id || ""}
        permissions={permissions}
      />
    </div>
  );
}
