import { useQuery } from "react-query";
import { GetDashboardData } from "../../services/dashboard.js";
import { DashboardData } from "../../types/dashboard";
import { Refetch } from "../../types";
import { AxiosResponse } from "axios";

export default function useDashboardData(filters: Record<string, string>): {
  dashboardData?: AxiosResponse<DashboardData>;
  isLoading?: boolean;
  refetch?: Refetch;
} {
  const {
    data: dashboardData,
    isLoading,
    refetch,
  } = useQuery(["dashboardData", filters], () => GetDashboardData(filters), {
    staleTime: Infinity,
    enabled: !!filters,
  });
  return { dashboardData, isLoading, refetch };
}
