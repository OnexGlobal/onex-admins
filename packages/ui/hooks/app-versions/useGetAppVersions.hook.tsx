import { useQuery } from "@tanstack/react-query";
import { appVersionsApi } from "../../services/app-versions";
import { AppVersionsFilter } from "@repo/types/src/app-versions";

export function useGetAppVersions(filters?: AppVersionsFilter) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["app-versions", filters],
    queryFn: () => appVersionsApi.fetchAppVersions(filters),
  });

  return { ...data?.data?.data, refetch, isLoading };
}
