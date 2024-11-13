import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { blogApi } from "../../services/blog";

export const useDeleteBlog = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["use-delete-blog"],
    mutationFn: blogApi.deleteBlog,
    onSuccess,
    onError,
  });
};
