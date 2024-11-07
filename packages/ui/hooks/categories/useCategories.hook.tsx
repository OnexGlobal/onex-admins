import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@repo/ui/services/categories";

export default function useCategories(type = "order") {
  const { data: categories } = useQuery({
    queryKey: ["categories", type],
    queryFn: () => categoriesApi.getCategoriesService(type),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data?.map((category: CategoriesTypes, i: number) => ({
        key: i,
        value: category?.id || "",
        label: category?.name || "",
        ...category,
      }));
    },
  });
  return { categories };
}

export interface CategoriesTypes {
  id: number;
  name: string;
  type: string;
  categoriesMl: {
    id: number;
    category_id: number;
    language_id: number;
    name: string;
    created_at?: null | string;
    updated_at?: null | string;
  }[];
}
