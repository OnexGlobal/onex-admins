import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useChangeOrderRecipient = (
  onSuccess: SuccessType,
  onError: ErrorType
) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["change-order-recipient"],
    mutationFn: ordersApi.changeOrderRecipient,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
