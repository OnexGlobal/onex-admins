import { Button, DatePicker, Segmented } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { reportsApi } from "../../services/reports";

const { RangePicker } = DatePicker;

interface Props {
  setFilters: Dispatch<SetStateAction<Record<string, string | null>>>;
  filters: Record<string, string | null>;
}

export default function ReportTopActions({ setFilters, filters }: Props) {
  const [activeTab, setActiveTab] = useState("All time");
  const [date, setDate] = useState<[null | Dayjs, null | Dayjs]>([null, null]);

  const { start_date, end_date } = filters;
  return (
    <div className="flex justify-end xl:flex-row sm:flex-col w-full gap-[16px]">
      <Segmented
        options={["All time", "Today", "This week", "This month", "This year"]}
        value={activeTab}
        onChange={(val) => {
          setActiveTab(String(val));
          const currentTime = new Date();
          const year = currentTime.getFullYear();
          if (val === "All time") {
            setFilters({
              type: "general",
            });
            setDate([null, null]);
          }
          if (val === "This year") {
            setFilters({
              ...filters,
              start_date: year + "-01-01",
              end_date: dayjs(currentTime).format("YYYY-MM-DD"),
            });
            setDate([dayjs(year + "-01-01"), dayjs(currentTime)]);
          }
          if (val === "This month") {
            setFilters({
              ...filters,
              start_date: dayjs(currentTime).format("YYYY-MM-01"),
              end_date: dayjs(currentTime).format("YYYY-MM-DD"),
            });
            setDate([
              dayjs(dayjs(currentTime).format("YYYY-MM-01")),
              dayjs(currentTime),
            ]);
          }
          if (val === "Today") {
            setFilters({
              ...filters,
              start_date: dayjs(currentTime).format("YYYY-MM-DD"),
              end_date: dayjs(currentTime).format("YYYY-MM-DD"),
            });
            setDate([dayjs(currentTime), dayjs(currentTime)]);
          }
          if (val === "This week") {
            setFilters({
              ...filters,
              start_date: dayjs().startOf("week").format("YYYY-MM-DD"),
              end_date: dayjs(currentTime).format("YYYY-MM-DD"),
            });
            setDate([dayjs().startOf("week"), dayjs(currentTime)]);
          }
        }}
      />

      <RangePicker
        value={date}
        onChange={(_, values) => {
          if (_ === null) {
            setActiveTab("All time");
          }
          setFilters({
            ...filters,
            start_date: values[0],
            end_date: values[1],
          });
          setDate([null, null]);
        }}
      />
      <Button
        icon={<DownloadIcon color={"white"} />}
        type="primary"
        onClick={() =>
          reportsApi.exportReportsExelList({ start_date, end_date })
        }
      >
        Excel
      </Button>
    </div>
  );
}
