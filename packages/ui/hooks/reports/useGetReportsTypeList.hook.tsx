import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../../services/reports";

export const useGetReportsTypeList = (
  type: string,
  params?: Record<string, string | null>
) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["reports-type-list", type, params],
    queryFn: () => reportsApi.fetchReportsList({ type: type, ...params }),
    staleTime: Infinity,
    select: ({ data }) => data?.data,
    enabled: !!type,
  });
  return {
    isLoading,
    reportsTypeList: data,
    refetch,
  };
};
