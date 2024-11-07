import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expectedApi } from "@repo/ui/services/expected";
import { ErrorType, SuccessType } from "@repo/types/src/query";

export const useCreateExpected = (
  onSuccess: SuccessType,
  onError: ErrorType
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["use-created-expected"],
    mutationFn: expectedApi.createExpected,
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
