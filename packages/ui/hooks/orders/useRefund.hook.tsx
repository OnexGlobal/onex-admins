import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useRefund = (onSuccess: SuccessType, onError: ErrorType) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["refund-order"],
    mutationFn: ordersApi.refundOrder,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
