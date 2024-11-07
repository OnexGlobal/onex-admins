import { useQuery } from "@tanstack/react-query";
import { balanceApi } from "../../services/balance";
import { BalancePaymentType } from "@repo/types/src/users";

export const useBalancesList = (params: Record<string, string | number>) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["balances", params],
    queryFn: () => balanceApi.fetchBalanceList(params),
    staleTime: Infinity,
    select: ({ data }) => {
      let sumIn = 0;
      let sumOut = 0;
      data?.data?.data?.forEach((el: BalancePaymentType) => {
        if (el.type == "in" && el?.sum) {
          sumIn += Number(el.sum);
        }
        if (el.type == "out" && el?.sum) {
          sumOut += Number(el.sum);
        }
      });
      let balancesList = data?.data?.data;
      let meta = data?.data?.meta;
      return { balancesList, meta, sumIn, sumOut };
    },
  });
  return {
    isLoading,
    balancesList: data?.balancesList,
    meta: data?.meta,
    sumIn: Math.round(Number(data?.sumIn) * 100) / 100,
    sumOut: Math.round(Number(data?.sumOut) * 100) / 100,
    refetch,
  };
};
