import useShowOrder from "@repo/ui/hooks/orders/useShowOrder.hook";
import { Dispatch, SetStateAction, useState } from "react";
import OrdersDetailsHeader from "@repo/ui/components/sections/Orders/DetailsHeader";
import OrderDetailsInfo from "@repo/ui/components/sections/Orders/DetailsInfo";
import OrderDetailStatuses from "@repo/ui/components/sections/Orders/DetailsStatuses";
import OrderDetailsCosts from "@repo/ui/components/sections/Orders/DetailsCosts";
import OrderDetailsCustomer from "@repo/ui/components/sections/Orders/DetailsCustomer";
import OrderDetailsSmartService from "@repo/ui/components/sections/Orders/DetailsSmartService";
import OrderDetailsEdit from "@repo/ui/components/sections/Orders/Edit";
import { Loader } from "@repo/ui/components/loader/Loader";
import { Permissions } from "@repo/types/src/permissions";
import OrderDetailsFooter from "@repo/ui/components/sections/Orders/DetailFooter";
import { Drawer } from "antd";

interface Props {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  id: number | string;
  permissions: Permissions["order"];
}

export default function OrdersDetailsModal({
  status,
  setStatus,
  id,
  permissions,
}: Props) {
  const [editStatus, setEditStatus] = useState(false);
  const { order, refetch } = useShowOrder(id);

  return (
    <Drawer
      title=""
      placement="right"
      onClose={() => setStatus(false)}
      open={status}
      width="80%"
      styles={{
        header: { display: "none" },
        footer: { borderTop: "none" },
        body: { background: "#f9fafb" },
      }}
      footer={
        <OrderDetailsFooter
          id={order?.id || ""}
          date={order?.created_at || "0000-00-00, 00:00"}
          setStatus={setStatus}
        />
      }
      className={`${
        editStatus ? "pt-[16px]  pr-[16px] pl-[16px]" : "p-[16px]"
      }`}
    >
      {order ? (
        <div className="flex flex-col">
          {!editStatus ? (
            <>
              <OrdersDetailsHeader
                setEditStatus={setEditStatus}
                order={order}
                category={order.category}
                permissions={permissions}
              />

              <OrderDetailsInfo order={order} />

              {!!order?.histories.length && (
                <OrderDetailStatuses histories={order.histories} />
              )}
              <OrderDetailsCosts order={order} />
            </>
          ) : (
            <OrderDetailsEdit
              setEditStatus={setEditStatus}
              order={order}
              refetch={refetch}
            />
          )}
          <OrderDetailsCustomer
            order={order}
            refetch={refetch}
            permissions={permissions}
          />
          {!!order?.service && (
            <OrderDetailsSmartService service={order?.service || {}} />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Drawer>
  );
}
