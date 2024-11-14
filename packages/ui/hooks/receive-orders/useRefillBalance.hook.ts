import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receiveOrdersApi } from "@repo/ui/services/receive-orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useRefillBalance = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["refill-balance"],
    mutationFn: receiveOrdersApi.refillBalanceService,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
