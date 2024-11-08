import { useMutation, useQueryClient } from "react-query";
import { bonusApi } from "services/bonus";
import { ErrorType, SuccessType } from "types";

export const useCreateBonus = (onSuccess: SuccessType, onError: ErrorType) => {
  const client = useQueryClient();
  return useMutation("create-bonus", bonusApi.createBonus, {
    onSuccess,
    onError,
    onSettled: async () => {
      await client.invalidateQueries(["create-bonus"]);
    },
  });
};
