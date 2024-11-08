import { useQuery } from "@tanstack/react-query";
import { bonusApi } from "../../services/bonus";

export const useGetBonusLis = (params: Record<string, string>) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["bonus-list", params],
    queryFn: () => bonusApi.fetchBonusList(params),
    staleTime: Infinity,
    select: ({ data }) => data.data,
  });
  return {
    isLoading,
    bonusList: data?.data,
    meta: data?.meta,
    refetch,
  };
};
