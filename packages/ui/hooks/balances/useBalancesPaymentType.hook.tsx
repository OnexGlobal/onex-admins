import { useQuery } from "@tanstack/react-query";
import { balanceApi } from "../../services/balance";
import { BalancePaymentType } from "@repo/types/src/users";

export const useBalancesPaymentTypeHook = () => {
  const {
    isLoading,
    data: paymentType,
    refetch,
  } = useQuery({
    queryKey: ["balances-payment-type"],
    queryFn: () => balanceApi.fetchBalancePaymentType(),
    staleTime: Infinity,
    select: ({ data }) =>
      data?.data?.data?.map((type: BalancePaymentType, i: number) => ({
        key: i,
        value: type?.id || "",
        label: type?.name,
      })),
  });
  return {
    isLoading,
    paymentType,
    refetch,
  };
};
