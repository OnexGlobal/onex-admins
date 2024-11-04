import { useQuery } from "react-query";
import { GetDashboardChartsData } from "../../services/dashboard.js";
import { FilterAsProps } from "types/dashboard.js";
import { Refetch } from "types";

export default function useGetDashboardChartsData(filters: FilterAsProps): {
  dashboardCharts: Record<string, Record<string, string | number>[]>;
  isLoading?: boolean;
  refetch?: Refetch;
} {
  const {
    data: dashboardCharts,
    isLoading,
    refetch,
  } = useQuery(
    ["dashboardCharts", filters],
    () => GetDashboardChartsData(filters),
    {
      staleTime: Infinity,
      select: ({ data }) => {
        return data?.data;
      },
    }
  );
  return { dashboardCharts, isLoading, refetch };
}
