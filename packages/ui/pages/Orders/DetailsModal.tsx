import useShowOrder from "hooks/orders/useShowOrder.hook";
import { Dispatch, SetStateAction, useState } from "react";
import OrdersDetailsHeader from "components/sections/Orders/DetailsHeader";
import OrderDetailsInfo from "components/sections/Orders/DetailsInfo";
import OrderDetailStatuses from "components/sections/Orders/DetailsStatuses";
import OrderDetailsCosts from "components/sections/Orders/DetailsCosts";
import OrderDetailsCustomer from "components/sections/Orders/DetailsCustomer";
import OrderDetailsSmartService from "components/sections/Orders/DetailsSmartService";
import OrderDetailsEdit from "components/sections/Orders/Edit";
import { Loader } from "components/common/Loader";
import { PermissionsType } from "types/permissions";
import { DrawerModal } from "components/elements/ModalDrawer";
import OrderDetailsFooter from "components/sections/Orders/DetailFooter";
import Flex from "components/elements/Flex";

interface Props {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  id: number | string;
  permissions: PermissionsType["order"];
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
    <DrawerModal
      title=""
      placement="right"
      onClose={() => setStatus(false)}
      open={status}
      width="80%"
      footer={
        <OrderDetailsFooter
          id={order?.id || ""}
          date={order?.created_at || "0000-00-00, 00:00"}
          setStatus={setStatus}
        />
      }
      _padding={editStatus ? "16px 16px 0 16px" : "16px"}
    >
      {order ? (
        <Flex flexDirection={"column"}>
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
        </Flex>
      ) : (
        <Loader />
      )}
    </DrawerModal>
  );
}
