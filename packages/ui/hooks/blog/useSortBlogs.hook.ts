import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { blogApi } from "../../services/blog";

export const useSortBlogs = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["sort-blog"],
    mutationFn: blogApi.sortBlog,
    onSuccess,
    onError,
  });
};
