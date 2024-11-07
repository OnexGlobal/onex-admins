import { useQuery } from "@tanstack/react-query";
import { expectedApi } from "@repo/ui/services/expected";

export default function useSingleExpected(id: number | string | null) {
  const {
    data: expectedByID,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["single-expected", id],
    queryFn: () => expectedApi.getSingleExpected(id),

    enabled: !!id,
    staleTime: Infinity,
  });

  return { expectedByID, refetch, isLoading };
}
