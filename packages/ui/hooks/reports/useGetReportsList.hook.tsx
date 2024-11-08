import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../../services/reports";

export const useGetReportsLis = (params: Record<string, string | null>) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["reports-list", params],
    queryFn: () => reportsApi.fetchReportsList(params),
    staleTime: Infinity,
    select: ({ data }) => {
      return data.data;
    },
  });
  return {
    isLoading,
    reportsList: data,
    meta: data?.meta,
    refetch,
  };
};
