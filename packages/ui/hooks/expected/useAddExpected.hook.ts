import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expectedApi } from "@repo/ui/services/expected";

const D: (data?: unknown) => void = () => {};
export const useAddExpected = (onSuccess = D, onError = D) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["use-add-expected"],
    mutationFn: expectedApi.addExpectedSmartService,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (e) => {
      onError(e);
    },
    onSettled: async () => {
      await client.invalidateQueries();
    },
  });
};
