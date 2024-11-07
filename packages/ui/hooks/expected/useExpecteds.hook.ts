import { expectedApi } from "../../services/expected";
import { useQuery } from "@tanstack/react-query";

export default function useGetExpected(
  filters: Record<string, string | number | boolean | undefined>
) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["expected-list", filters],
    queryFn: () => expectedApi.getExpected(filters),
    staleTime: Infinity,
    select: ({ data }) => data?.data,
  });
  return { expectedList: data?.data, meta: data?.meta, refetch, isLoading };
}
