import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { shopsApi } from "../../services/shops";

export const useCreateAndEditShops = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["created-and-updated-shops"],
    mutationFn: shopsApi.createAndEditShops,
    onSuccess,
    onError,
  });
};
