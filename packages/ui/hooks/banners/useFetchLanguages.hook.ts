import { useQuery } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";
import { LanguagesType } from "@repo/types/src/marketing-content";

export const useFetchLanguages = () => {
  const {
    isLoading,
    refetch,
    data: languages,
  } = useQuery({
    queryKey: ["get-languages"],
    queryFn: () => bannersApi.fetchLanguages(),
    staleTime: Infinity,
    select: ({ data }) => data?.data?.data as LanguagesType[],
  });
  return { isLoading, languages, refetch };
};
