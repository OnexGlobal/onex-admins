import { useMutation } from "@tanstack/react-query";
import { bonusApi } from "../../services/bonus";

export const useCreateBonus = (onSuccess = () => {}, onError = () => {}) => {
  return useMutation({
    mutationKey: ["create-bonus"],
    mutationFn: bonusApi.createBonus,
    onSuccess,
    onError,
  });
};
