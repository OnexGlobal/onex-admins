import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";

export const useDeleteBanner = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: bannersApi.deleteBanner,
    onSuccess,
    onError,
  });
};
