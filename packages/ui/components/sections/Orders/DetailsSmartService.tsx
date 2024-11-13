import { Image, Tag } from "antd";
import { SmartServiceType } from "@repo/types/src/orders";

export default function OrderDetailsSmartService({
  service,
}: {
  service: SmartServiceType;
}) {
  return (
    <div className="flex rounded-[12px] bg-white p-[16px] gap-[10px 50px]">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-info font-[500] text-oxford-blue-400">
          Smart Service
        </h1>
        <Tag className="bg-oxford-blue-50 text-oxford-blue-400">
          <div className="flex gap-[8px]">
            <img src={service?.smart_service?.image} width="24" alt={""} />
            {service.smart_service?.current_smart_service?.name || ""}
          </div>
        </Tag>
      </div>
      <div className="flex flex-col gap-[5px] border-l-[1px] border-oxford-blue-50 pl-[10px]">
        <h1 className="text-info font-[500] text-oxford-blue-400">
          Smart Service
        </h1>

        <Tag
          className={`${
            service?.status === "done" ? "bg-green-50" : "bg-cyan-50"
          } ${service?.status === "done" ? "text-green-500" : "text-cyan-600"}`}
        >
          {service?.status || ""}
        </Tag>
      </div>
      <div className="flex w-full gap-[20px]">
        {service?.files?.map((img, i) => (
          <Image className={"img_details"} src={img?.file} key={i} />
        ))}
      </div>
    </div>
  );
}
