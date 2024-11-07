import { expectedApi } from "@repo/ui/services/expected";
import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteExpected = (
  onSuccess: SuccessType,
  onError: ErrorType
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["use-delete-expected"],
    mutationFn: expectedApi.deleteExpected,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
