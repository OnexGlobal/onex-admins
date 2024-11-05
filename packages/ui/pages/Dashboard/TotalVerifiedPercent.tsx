import { Tooltip } from "antd";
import { useMemo } from "react";
import { DashboardData } from "../../../types/src/dashboard";

export default function TotalVerifiedPercent({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const percentage = useMemo(() => {
    if (!dashboardData) return 0;
    return Math.round(+dashboardData?.all_info?.completed_percentage_in_all);
  }, [dashboardData]);

  return (
    <div
      className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all`}
      style={{
        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${
          percentage >= 85 ? "#0a2540" : "#FC4447"
        } ${percentage}%, #e7e9ec 0)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Tooltip title={"Verified rate"} placement={"bottom"}>
          <div className="text-lg font-bold text-[#0a2540] md:text-base">
            {percentage}%
          </div>
        </Tooltip>
      </div>

      {/* Hidden progress element */}
      <progress
        id={"myprogress"}
        value={25}
        max="100"
        className="invisible w-0 h-0"
      ></progress>
    </div>
  );
}
