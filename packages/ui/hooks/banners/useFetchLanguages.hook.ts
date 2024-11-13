import { useQuery } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";

export const useFetchLanguages = () => {
  const {
    isLoading,
    refetch,
    data: languages,
  } = useQuery({
    queryKey: ["get-languages"],
    queryFn: () => bannersApi.fetchLanguages(),
    staleTime: Infinity,
    select: ({ data }) => data?.data?.data,
  });
  return { isLoading, languages, refetch };
};
