import { useQuery } from "@tanstack/react-query";
import { shopsApi } from "../../services/shops";

export const useFetchShops = (params: object) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["get-shops", params],
    queryFn: () => shopsApi.fetchShops(params),
    staleTime: Infinity,
    select: ({ data }) => data?.data,
  });
  return { isLoading, shops: data?.data, meta: data?.meta, refetch };
};
