import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { slidesApi } from "../../services/slides-sort";

export const useSortSlide = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["sort-slides"],
    mutationFn: slidesApi.sortSlides,
    onSuccess,
    onError,
  });
};