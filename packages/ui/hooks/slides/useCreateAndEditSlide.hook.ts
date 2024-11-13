import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { slidesApi } from "../../services/slides-sort";

export const useCreateAndEditSlid = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["created-and-updated-slider"],
    mutationFn: slidesApi.createSlide,
    onSuccess,
    onError,
  });
};
