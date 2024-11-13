import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { slidesApi } from "../../services/slides-sort";

export const useDeleteSlider = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["update-activate-toggle"],
    mutationFn: slidesApi.deleteSlider,
    onSuccess,
    onError,
  });
};
