import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { shopsApi } from "../../services/shops";

export const useIsActiveShop = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["update-activate-shop-toggle"],
    mutationFn: shopsApi.isActiveShops,
    onSuccess,
    onError,
  });
};
