import { useQuery } from "@tanstack/react-query";
import { consignmentApi } from "../../services/consignment";

export const useConsignmentList = (params?: Record<string, string>) => {
  const {
    isError,
    isLoading,
    data,
    refetch: reFetchList,
  } = useQuery({
    queryKey: ["consignment_list", params],
    queryFn: () => consignmentApi.fetchConsignmentList(params),
    staleTime: Infinity,
    select: ({ data }) => {
      let consignmentList = data?.data?.data;
      let meta = data?.data?.meta;
      return { consignmentList, meta };
    },
  });
  return {
    isLoading,
    consignmentList: data?.consignmentList,
    meta: data?.meta,
    reFetchList,
  };
};
