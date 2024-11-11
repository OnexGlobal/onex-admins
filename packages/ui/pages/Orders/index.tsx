import { useState } from "react";
import OrdersTopActions from "./TopActions";
import OrdersTable from "./Table";
import OrdersDetailsModal from "./DetailsModal";
import { Typography } from "components/elements/Typography";
import { StylePage } from "../style-page";
import useGetOrders from "hooks/orders/useGetOrders.hook";
import { PermissionsType } from "types/permissions";

interface Props {
  permissions: PermissionsType["order"];
}

export default function Orders({ permissions }: Props) {
  const [id, setId] = useState<string | number | undefined>();
  const [detailsStatus, setDetailsStatus] = useState(false);
  const [filters, setFilters] = useState({});
  const { orders, isLoading, meta } = useGetOrders(filters);

  return (
    <StylePage>
      <Typography text="Orders" level={3} margin="0 0 24px 0" variant="Title" />

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
    </StylePage>
  );
}
