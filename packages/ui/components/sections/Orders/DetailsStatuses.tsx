import InArmeniaIcon from "@repo/ui/assets/icons/InArmeniaIcon";
import OnTheWayIcon from "@repo/ui/assets/icons/OnTheWayIcon";
import ReadyIcon from "@repo/ui/assets/icons/ReadyIcon";
import ReceivedIcon from "@repo/ui/assets/icons/ReceivedIcon";
import ScannedIcon from "@repo/ui/assets/icons/ScannedIcon";
import WerHouseIcon from "@repo/ui/assets/icons/werhouse";
import { ReactNode } from "react";

export default function OrderDetailStatuses({
  histories,
}: {
  histories: { key: string; date?: string }[];
}) {
  const statusesKeyValues: {
    [key: string]: { label: string; icon: ReactNode };
  } = {
    scan_date: { label: "Scanned", icon: <ScannedIcon /> },
    repack_date: { label: "Repack", icon: <ReceivedIcon /> },
    at_warehouse_date: { label: "At Warehouse", icon: <WerHouseIcon /> },
    on_way_date: { label: "On the way", icon: <OnTheWayIcon /> },
    in_georgia_date: { label: "In Georgia", icon: <InArmeniaIcon /> },
    ready_for_pickup_date: { label: "Ready", icon: <ReadyIcon /> },
    received_date: { label: "Received", icon: <ReceivedIcon /> },
  };

  return (
    <div className="flex rounded-[12px] bg-white p-[16px] mt-[16px] mb-[16px]">
      {histories.map((history, index) => (
        <div className="flex items-center" key={index}>
          {index === 0 ? (
            ""
          ) : (
            <div className="w-[50px] mr-[16px] ml-[16px] bg-oxford-blue-50 h-[1px]" />
          )}
          {statusesKeyValues[history.key].icon}
          <div className="flex flex-col pl-[10px]">
            <h1 className="text-info font-[500] text-oxford-blue-400">
              {statusesKeyValues[history.key].label}
            </h1>
            <h1 className="text-info font-[500]">{history.date}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
