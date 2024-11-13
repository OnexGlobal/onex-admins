import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { blogApi } from "../../services/blog";

export const useCreateAndEditBlog = (
  onSuccess: SuccessType = () => {},
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["created-and-updated-blogs"],
    mutationFn: blogApi.createAndEditBlog,
    onSuccess,
    onError,
  });
};
