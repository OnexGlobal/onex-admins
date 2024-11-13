import { useQuery } from "@tanstack/react-query";
import { actionsApi } from "../../services/actions-history";

export const useActionsHistory = (filter: object) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["actions-history", filter],
    queryFn: () => actionsApi.fetchActionsHistory(filter),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data;
    },
  });
  return { isLoading, actionList: data?.data, meta: data?.meta, refetch };
};
