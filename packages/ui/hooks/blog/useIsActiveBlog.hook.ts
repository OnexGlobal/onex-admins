import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { blogApi } from "../../services/blog";

export const useIsActiveBlog = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["update-blog-activate-toggle"],
    mutationFn: blogApi.isActiveBlog,
    onSuccess,
    onError,
  });
};
