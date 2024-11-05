import { DatePicker, Segmented } from "antd";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { DashboardData, FILTERS } from "../../../types/src/dashboard";

const { RangePicker } = DatePicker;

interface Props {
  setFilterType: Dispatch<SetStateAction<FILTERS>>;
  setCustomRange: Dispatch<SetStateAction<string[]>>;
  dashboardData?: DashboardData;
}

const filters: { label: string; value: FILTERS }[] = [
  { value: FILTERS.day, label: "Today" },
  { value: FILTERS.week, label: "This week" },
  { value: FILTERS.month, label: "This month" },
  { value: FILTERS.year, label: "This year" },
];
export default function DashboardTopActions({
  setFilterType,
  setCustomRange,
  dashboardData,
}: Props) {
  return (
    <div className="w-[100%] flex justify-end items-center gap-[16px] mb-[16px]">
      <Segmented
        options={filters}
        onChange={(val) => {
          setFilterType(val as FILTERS);
          setCustomRange([]);
        }}
      />
      <RangePicker
        defaultValue={[
          dayjs(dashboardData?.current_start_date.substr(0, 10), "YYYY-MM-DD"),
          dayjs(dashboardData?.current_end_date.substr(0, 10), "YYYY-MM-DD"),
        ]}
        onChange={(_, values) => setCustomRange(values)}
      />
    </div>
  );
}
