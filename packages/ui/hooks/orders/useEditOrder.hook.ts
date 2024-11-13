import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useEditOrder = (onSuccess?: SuccessType, onError?: ErrorType) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["edit-order-service"],
    mutationFn: ordersApi.editOrderService,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
