import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receiveOrdersApi } from "@repo/ui/services/receive-orders";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useReceiveOrders = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["receive-orders"],
    mutationFn: receiveOrdersApi.receiveOrdersService,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
