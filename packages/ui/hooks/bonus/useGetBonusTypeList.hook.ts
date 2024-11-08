import { useQuery } from "@tanstack/react-query";
import { bonusApi } from "../../services/bonus";

export const useGetBonusTypeLis = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["bonus-type-list"],
    queryFn: () => bonusApi.fetchBonusTypeList(),
    staleTime: Infinity,
    select: ({ data }) => {
      const list = data?.data?.data?.map(
        (type: { id: string; name: string }) => ({
          key: type?.id || "",
          value: type?.id || "",
          label: type?.name || "",
          ...type,
        })
      );
      return { list, meta: data?.meta };
    },
  });
  return {
    isLoading,
    bonusTypeList: data?.list,
    refetch,
  };
};
