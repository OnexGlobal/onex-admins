import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DashboardData, Refetch } from "@repo/types";
import { GetDashboardData } from "../../services/dashboard";

export default function useDashboardData(filters: Record<string, string>): {
  dashboardData?: AxiosResponse<DashboardData>;
  isLoading?: boolean;
  refetch?: Refetch;
} {
  const {
    data: dashboardData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dashboardData", filters],
    queryFn: () => GetDashboardData(filters),
    staleTime: Infinity,
    enabled: !!filters,
  });
  return { dashboardData, isLoading, refetch };
}
