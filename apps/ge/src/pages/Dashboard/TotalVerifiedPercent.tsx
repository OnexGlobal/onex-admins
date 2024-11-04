import { Tooltip } from "antd";
import { useMemo } from "react";
import { DashboardData } from "../../types/dashboard";

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
    <div>
      <div
        className="flex w-[100px] h-[100px] rounded-[50%] justify-center items-center relative transition-[250ms]"
        style={{
          background: `radial-gradient(closest-side, white 79% transparent 80% 100%) conic-gradient(${
            percentage >= 85 ? "#0a2540" : "#FC4447"
          } var(--percent), #e7e9ec 0) --percent: 85%`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Tooltip title={"Verified rate"} placement={"bottom"}>
            <div>{percentage}%</div>
          </Tooltip>
        </div>

        <progress
          id={"myprogress"}
          value={25}
          max="100"
          style={{ visibility: "hidden", width: "0", height: "0" }}
        />
      </div>
    </div>
  );
}
