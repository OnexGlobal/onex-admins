import { useQuery } from "@tanstack/react-query";
import { balanceApi } from "../../services/balance";
import { BalancePaymentType } from "@repo/types/src/users";

export const useBalancesTransferTypeHook = () => {
  const {
    isLoading,
    data: transferType,
    refetch,
  } = useQuery({
    queryKey: ["balances-transfer-type"],
    queryFn: () => balanceApi.fetchBalanceTransferType(),
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
    transferType,
    refetch,
  };
};
