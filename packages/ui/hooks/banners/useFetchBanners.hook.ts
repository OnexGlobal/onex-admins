import { useQuery } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";

export const useFetchBanners = (params: object) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["get-banners", params],
    queryFn: () => bannersApi.fetchBanners(params),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data;
    },
  });
  return { isLoading, banners: data?.data, meta: data?.meta, refetch };
};
