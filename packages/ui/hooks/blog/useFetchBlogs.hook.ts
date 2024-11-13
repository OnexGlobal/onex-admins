import { useQuery } from "@tanstack/react-query";
import { blogApi } from "../../services/blog";
import { BlogType } from "@repo/types/src/marketing-content";

export const useFetchBlog = (params: object) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["get-blogs", params],
    queryFn: () => blogApi.fetchBlog(params),
    staleTime: Infinity,
    select: ({ data }) => {
      const blogs = data?.data?.data?.map((blog: BlogType, i: number) => ({
        ...blog,
        key: blog.id || i,
        value: blog.id || "",
        label: blog?.title || "",
      }));
      return {
        meta: data?.data.meta,
        blogs,
      };
    },
  });
  return { isLoading, blogs: data?.blogs, meta: data?.meta, refetch };
};
