import HeightIcon from "@repo/ui/assets/icons/HeightIcon";
import DepthIcon from "@repo/ui/assets/icons/ParcelDepth";
import { OrderData } from "@repo/types/src/orders";
import { Tag } from "antd";

interface Props {
  order: OrderData;
}

export default function OrderDetailsInfo({ order }: Props) {
  return (
    <div className="flex justify-between mt-[16px] gap-[16px]">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between w-[100%] gap-[16px]">
          <div className="flex rounded-[12px] bg-white p-[16px] gap-x-[50px] w-[100%] h-max">
            <div>
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Weight
              </h1>
              <h1 className="text-info">{`${order?.weight} kg`}</h1>
            </div>
            <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
              <h1 className="text-info font-[500] text-oxford-blue-400">
                V Weight
              </h1>
              <h1 className="text-info">{`${order?.v_weight} kg`}</h1>
            </div>

            <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Cost
              </h1>
              <h1 className="text-info">{`${order?.cost} ₾`}</h1>
            </div>
          </div>

          <div className="flex rounded-[12px] bg-white p-[16px] gap-x-[50px] w-[100%] h-max">
            <div>
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Parcel ID
              </h1>
              <h1 className="text-info">{order?.parcel?.name}</h1>
            </div>
            <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Box ID
              </h1>
              <h1 className="text-info">{order?.box?.reference_id}</h1>
            </div>

            <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Estimated
              </h1>
              <h1 className="text-info">{order?.estimated_date_to}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-[100%] gap-[16px]">
          <div className="rounded-[12px] bg-white p-[16px] gap-[5px] w-[100%] h-max flex-col">
            <h1 className="text-info font-[500] text-oxford-blue-400">
              Pickup Point
            </h1>
            <h1 className="text-info whitespace-nowrap">
              {order?.pickup_point?.address}
            </h1>
          </div>

          <div className="flex rounded-[12px] bg-white p-[16px] gap-x-[50px] w-[100%] h-max">
            <div>
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Height
              </h1>
              <div className="flex items-center">
                <HeightIcon />
                <h1 className="text-info pl-[8px]">{order.height}</h1>
                <h1 className="text-info pl-[8px] text-oxford-blue-200">mm</h1>
              </div>
            </div>

            <div>
              <h1 className="text-info font-[500] text-oxford-blue-400">
                Depth
              </h1>
              <div className="flex items-center ">
                <DepthIcon />
                <h1 className="text-info pl-[8px]">{order.width}</h1>
                <h1 className="text-info pl-[8px] text-oxford-blue-200">mm</h1>
              </div>
            </div>

            <div>
              <h1 className="text-info font-[500] text-oxford-blue-400 ">
                Length
              </h1>
              <div className="flex items-center">
                <DepthIcon />
                <h1 className="text-info pl-[8px]">{order.length} </h1>
                <h1 className="text-info pl-[8px] text-oxford-blue-200">mm</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {order?.size_type && order?.size_type === "not_locker_size" ? (
        <Tag className="bg-cyan-50 text-cyan-600 mb-[16px]">
          Not Locker Size
        </Tag>
      ) : order?.size_type && order?.size_type === "not_standard_size" ? (
        <Tag className="bg-blue-50 text-blue-600 mb-[16px]">
          Not Standart Size
        </Tag>
      ) : (
        ""
      )}
    </div>
  );
}
