import { useQuery } from "@tanstack/react-query";
import { slidesApi } from "../../services/slides-sort";

export const useFetchSlides = (params: object) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["get-slides", params],
    queryFn: () => slidesApi.fetchSlides(params),
    staleTime: Infinity,
    select: ({ data }) => {
      return {
        slides: data?.data?.data,
        meta: data?.data?.meta,
      };
    },
  });

  return { isLoading, slides: data?.slides, meta: data?.meta, refetch };
};
