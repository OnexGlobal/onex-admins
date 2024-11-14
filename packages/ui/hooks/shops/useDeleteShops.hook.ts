import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { shopsApi } from "../../services/shops";

export const useDeleteShops = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["delete-shops"],
    mutationFn: shopsApi.deleteShops,
    onSuccess,
    onError,
  });
};
