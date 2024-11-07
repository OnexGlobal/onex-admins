import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expectedApi } from "@repo/ui/services/expected";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useDeleteExpectedSmartService = (
  onSuccess: SuccessType,
  onError: ErrorType
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["use-delete-expected-smart-service"],
    mutationFn: expectedApi.deleteExpectedSmartService,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
