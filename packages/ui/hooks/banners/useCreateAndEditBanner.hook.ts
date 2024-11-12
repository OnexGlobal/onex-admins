import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";

export const useCreateAndEditBanner = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["created-and-updated-banner"],
    mutationFn: bannersApi.createAndUpdateBanner,
    onSuccess,
    onError,
  });
};
