import { Tag } from "antd";

interface Props {
  order: {
    invoice: {
      file: string;
    };
    additional_cost?: number | string;
    cost?: number | string;
  };
}

export default function OrderDetailsCosts({ order }: Props) {
  return (
    <div className="flex mb-[16px] rounded-[12px] bg-white p-[16px] gap-[50px]">
      <div>
        <h1 className="text-info font-[500] text-oxford-blue-400">Cost</h1>
        <h1 className="text-info">{`${order.cost} $`}</h1>
      </div>
      <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
        <h1 className="text-info font-[500] text-oxford-blue-400">
          Additional cost
        </h1>
        <h1 className="text-info">{order.additional_cost}</h1>
      </div>

      {order?.invoice ? (
        <a
          href={order?.invoice?.file}
          target="_blank"
          download={true}
          style={{ marginLeft: "auto" }}
        >
          <Tag className="bg-cyan-50 text-cyan-600">Invoice</Tag>
        </a>
      ) : null}

      {/* <Tag text="Registered" background="#FFF5EB" color="#E58C35" /> */}
    </div>
  );
}
