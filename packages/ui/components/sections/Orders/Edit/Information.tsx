import { AutoComplete, Form, Input } from "antd";
import HeightIcon from "@repo/ui/assets/icons/HeightIcon";
import LengthIcon from "@repo/ui/assets/icons/LengthIcon";
import DepthIcon from "@repo/ui/assets/icons/ParcelDepth";
import { useState } from "react";
import { OrderData } from "@repo/types/src/orders";
import useGetParcel from "@repo/ui/hooks/parcel/useGetParcel.hook";

interface Props {
  order: OrderData;
}

export default function Information({ order }: Props) {
  const [parcelSearch, setParcelSearch] = useState({});
  const { parcelList } = useGetParcel(parcelSearch);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex rounded-[12px] bg-white p-[16px] mb-[16px] h-max w-[48%] gap-[16px]">
          <Form.Item name={"weight"} label={"Weight"}>
            <Input suffix="kg" />
          </Form.Item>

          <Form.Item label={"V Weight"} name={"v_weight"}>
            <Input suffix="kg" />
          </Form.Item>

          <Form.Item name={"cost"} label={"Cost"}>
            <Input suffix={import.meta.env.VITE_APP_CURRENCY || ""} />
          </Form.Item>
        </div>
        <div className="flex rounded-[12px] bg-white p-[16px] mb-[16px] h-max w-[48%] gap-[16px] justify-between">
          <Form.Item name={"parcel_id"} label={"Parcel ID"}>
            <AutoComplete
              placeholder="Parcel"
              onSearch={(val) => setParcelSearch({ name: val || null })}
              options={parcelList}
              style={{ width: 151 }}
            />
          </Form.Item>

          <Form.Item name={"box_id"} label={"Box ID"}>
            <Input />
          </Form.Item>

          <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
            <h1 className="text-description text-oxford-blue-400">Estimated</h1>
            <h1 className="text-description mt-[10px] mb-[10px]">
              {order?.estimated_date_to}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-between rounded-[12px] bg-white p-[16px] mb-[16px] h-max">
        <div className="border-l-[1px] max-h-[60px] border-oxford-blue-50 pl-[10px]">
          <h1 className="text-info text-oxford-blue-400 font-[500] pt-[2px] pb-[2px]">
            Pickup Point
          </h1>
          <h1 className="text-info text-oxford-blue-400 pt-[2px] pb-[2px]">
            {order?.pickup_point?.address}
          </h1>
        </div>

        <div className="flex w-[60%] gap-[16px] justify-end">
          <Form.Item name={"height"} label={"Height"}>
            <Input
              className="input-prefix-suffix"
              value="0.4"
              prefix={<HeightIcon />}
              suffix="mm"
            />
          </Form.Item>

          <Form.Item name={"width"} label={"Width"}>
            <Input
              className="input-prefix-suffix"
              value="0.4"
              prefix={<DepthIcon />}
              suffix="mm"
            />
          </Form.Item>

          <Form.Item name={"length"} label={"Length"}>
            <Input
              className="input-prefix-suffix"
              value="0.4"
              prefix={<LengthIcon />}
              suffix="mm"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
}
