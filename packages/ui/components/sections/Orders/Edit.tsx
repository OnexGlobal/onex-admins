import { Button, Form } from "antd";
import dayjs from "dayjs";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import Header from "./Edit/Header";
import Information from "./Edit/Information";
import Times from "./Edit/Times";
import Costs from "./Edit/Costs";
import Comment from "./Edit/Comment";
import { Dispatch, SetStateAction } from "react";
import { OrderData } from "@repo/types/src/orders";
import { Refetch } from "@repo/types";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import { useEditOrder } from "@repo/ui/hooks/orders/useEditOrder.hook";

interface Props {
  setEditStatus: Dispatch<SetStateAction<boolean>>;
  order: OrderData;
  refetch: Refetch;
}

export default function OrderDetailsEdit({
  setEditStatus,
  order,
  refetch,
}: Props) {
  const { data } = useGetWarehouses();
  const { mutate } = useEditOrder(
    (res) => {
      if (res.data.success) {
        notificationSuccess("Success !", res.data.message);
        refetch().then(() => {
          setEditStatus(false);
        });
      }
    },
    (error) => {
      if (error) notificationError("Error !");
    }
  );
  const getStatusDate = (key: string) => {
    const result = order?.histories.find(
      (item: { key: string }) => item.key === key
    );
    return result?.date || null;
  };

  const getChargeCosts = (key: string) => {
    const result = order?.additional_costs.find((item) => item.type === key);
    return result?.cost || null;
  };
  const handleSave = ({
    expected_date,
    at_warehouse_date,
    on_way_date,
    in_georgia_date,
    received_date,
    ...values
  }: {
    [key: string]: string | null | number;
  }) => {
    const sendData: { [key: string]: string | null | number } = {
      expected_date: expected_date
        ? dayjs(expected_date).format("YYYY-MM-DD")
        : null,
      at_warehouse_date: at_warehouse_date
        ? dayjs(at_warehouse_date).format("YYYY-MM-DD")
        : null,
      on_way_date: on_way_date ? dayjs(on_way_date).format("YYYY-MM-DD") : null,
      in_georgia_date: in_georgia_date
        ? dayjs(in_georgia_date).format("YYYY-MM-DD")
        : null,
      received_date: received_date
        ? dayjs(received_date).format("YYYY-MM-DD")
        : null,
      ready_for_pickup: order?.ready_for_pickup,
      ...values,
    };
    Object.keys(sendData).forEach((key) => {
      if (!sendData[key]) {
        delete sendData[key];
      }
    });
    mutate({ id: order?.id, data: sendData });
  };

  const formInitialValues = {
    tracking_code: order?.tracking_code,
    warehouse_id: order?.warehouse?.id,
    status: order?.status,
    dispatch_type: order?.dispatch?.type || "air",
    ready_for_pickup: 0,
    declaration_price: order?.declaration_price || "",
    declaration_currency: order?.declaration_currency,
    invoice: order?.invoice || null,
    is_dangerous: order?.is_dangerous,
    weight: order?.weight,
    v_weight: order?.v_weight,
    cost: order?.cost,
    parcel_id: order?.parcel?.id,
    box_id: order?.box?.id,
    height: order?.height,
    width: order?.width,
    length: order?.length,
    expected_date: order?.expected?.created_at
      ? dayjs(order?.expected?.created_at, "YYYY-MM-DD")
      : null,
    at_warehouse_date: getStatusDate("at_warehouse_date")
      ? dayjs(getStatusDate("at_warehouse_date"), "YYYY-MM-DD")
      : null,
    on_way_date: getStatusDate("on_way_date")
      ? dayjs(getStatusDate("on_way_date"), "YYYY-MM-DD")
      : null,
    in_georgia_date: getStatusDate("in_georgia_date")
      ? dayjs(getStatusDate("in_georgia_date"), "YYYY-MM-DD")
      : null,
    received_date: getStatusDate("received_date")
      ? dayjs(getStatusDate("received_date"), "YYYY-MM-DD")
      : null,
    additional_cost: getChargeCosts("additional_cost") || 0,
    charge_cost: getChargeCosts("charge_cost") || 0,
    ups_cost: getChargeCosts("ups_cost") || 0,
  };

  return (
    <Form
      name={"order-edit"}
      layout={"vertical"}
      onFinish={handleSave}
      initialValues={formInitialValues}
    >
      <div className="flex justify-end">
        <Button
          className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50 mr-[12px]"
          onClick={() => setEditStatus(false)}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
      <Header warehouses={data} order={order} />
      <Comment />
      <Information order={order} />
      <Times order={order} />
      <Costs />
    </Form>
  );
}
