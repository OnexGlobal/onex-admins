import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useSendToHub = (onSuccess?: SuccessType, onError?: ErrorType) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["send-to-hub"],
    mutationFn: ordersApi.sendToHubOrder,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
