import { useQuery } from "@tanstack/react-query";
import { Refetch } from "@repo/types";
import { GetDashboardData } from "../../services/dashboard";
import { DashboardData } from "@repo/types/src/dashboard";

export default function useDashboardData(filters: Record<string, string>): {
  dashboardData?: { data: DashboardData };
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
