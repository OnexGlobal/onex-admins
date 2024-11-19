import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../../services/reports";
import { Meta, Refetch } from "@repo/types";

interface ReturnType {
  isLoading: boolean;
  reportsList: { key: string; value: string }[];
  meta: Meta;
  refetch: Refetch;
}

export const useGetReportsLis = (
  params: Record<string, string | null>
): ReturnType => {
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
