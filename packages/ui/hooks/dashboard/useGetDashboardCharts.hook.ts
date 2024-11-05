import { useQuery } from "@tanstack/react-query";
import { GetDashboardChartsData } from "../../services/dashboard";
import { Dashboard, Refetch } from "@repo/types";

export default function useGetDashboardChartsData(
  filters: Dashboard.FilterAsProps
): {
  dashboardCharts: Record<string, Record<string, string | number>[]>;
  isLoading?: boolean;
  refetch?: Refetch;
} {
  const {
    data: dashboardCharts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dashboardCharts", filters],
    queryFn: () => GetDashboardChartsData(filters),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data;
    },
  });
  return { dashboardCharts, isLoading, refetch };
}
