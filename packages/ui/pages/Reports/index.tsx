import ReportTopActions from "./TopActions";
import ReportsData from "./Data";
import { useState } from "react";
import { useGetReportsLis } from "../../hooks/reports/useGetReportsList.hook";
import { Loader } from "../../components/loader/Loader";

export default function Reports() {
  const [filters, setFilters] = useState<Record<string, string | null>>({
    type: "general",
    end_date: null,
    start_date: null,
  });
  const { reportsList, isLoading } = useGetReportsLis(filters);
  return (
    <>
      <span className="text-title sm:mb-[24px] md:mb-0">Reports</span>

      <ReportTopActions setFilters={setFilters} filters={filters} />
      {isLoading ? (
        <Loader />
      ) : (
        <ReportsData
          reportsList={reportsList}
          params={{
            end_date: filters?.end_date || null,
            start_date: filters?.start_date || null,
          }}
        />
      )}
    </>
  );
}
