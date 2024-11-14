import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { shopsApi } from "../../services/shops";

export const useSortShops = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["sort-shops"],
    mutationFn: shopsApi.sortShop,
    onSuccess,
    onError,
  });
};
