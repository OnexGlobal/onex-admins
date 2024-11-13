import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { bannersApi } from "../../services/banners";

export const useIsActiveBanner = (
  onSuccess: SuccessType,
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["update-banner-toggle"],
    mutationFn: bannersApi.isActiveBanner,
    onSuccess,
    onError,
  });
};
