import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { bonusApi } from "../../services/bonus";

export const useCreateBonus = (onSuccess: SuccessType, onError: ErrorType) => {
  return useMutation({
    mutationKey: ["create-bonus"],
    mutationFn: bonusApi.createBonus,
    onSuccess,
    onError,
  });
};
