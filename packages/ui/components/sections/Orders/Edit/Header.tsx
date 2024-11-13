import { Form, Input, Select, Space } from "antd";
import FlyIcon from "@repo/ui/assets/icons/FlyIcon";
import useGetCurrencies from "@repo/ui/hooks/currencies/useGetCurrencies.hooks";
import { OrderData } from "@repo/types/src/orders";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import { orderStatusOptions } from "@repo/ui/constants/order-status-texts";
import { AttachInvoice } from "@repo/ui/components/elements/AttachInvoice";
import { additionalInfoOptions } from "@repo/ui/constants/additional-options";

interface Props {
  order: OrderData;
  warehouses: { round_flag: string; id: number }[];
}

export default function Header({ order }: Props) {
  const { currencies = [] } = useGetCurrencies();
  const { data: warehouses } = useGetWarehouses();
  return (
    <div className="flex flex-col justify-between">
      <div className="w-full flex gap-[16px]">
        <Form.Item
          name="warehouse_id"
          label={"Warehouse"}
          className="w-[180px]"
        >
          <Select defaultValue={order?.warehouse.id} options={warehouses} />
        </Form.Item>

        <Form.Item
          name="dispatch_type"
          className="w-[120px]"
          label={"Dispatch"}
        >
          <Select
            options={[
              {
                value: "air",
                label: <FlyIcon size={"20"} />,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="tracking_code"
          className="w-[360px]"
          label={"Tracking code"}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label={"Status"} className="w-[156px]">
          <Select placeholder="In Local Country" options={orderStatusOptions} />
        </Form.Item>
      </div>
      <div className="flex gap-[24px]">
        <Space.Compact className="flex items-end">
          <Form.Item name={"declaration_price"} label={"Declarated price"}>
            <Input placeholder={"Price"} />
          </Form.Item>
          <Form.Item name={"declaration_currency"} className="w-[80px]">
            <Select options={currencies} placeholder={"Currency"} />
          </Form.Item>
        </Space.Compact>
        <Form.Item name={"invoice"} label={"Invoice"} className="min-w-[80px]">
          <AttachInvoice />
        </Form.Item>
        <Form.Item name={"tag"} label={"Tag"} className="w-[250px]">
          <Select
            placeholder="Additional Info Text"
            options={additionalInfoOptions}
          />
        </Form.Item>
      </div>
    </div>
  );
}
