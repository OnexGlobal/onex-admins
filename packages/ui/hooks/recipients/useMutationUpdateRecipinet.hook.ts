import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipientsApi } from "../../services/recipients";

const D: (data?: unknown) => void = () => {};
export const useMutationUpdateRecipient = (onSuccess = D, onError = D) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["update-recipient"],
    mutationFn: recipientsApi.updateRecipientService,
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
