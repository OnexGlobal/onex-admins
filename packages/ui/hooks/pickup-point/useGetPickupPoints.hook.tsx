import { useQuery } from "@tanstack/react-query";
import { pickupPointApi } from "@repo/ui/services/pickupPoints";
import { PickupPointType } from "@repo/types/src/pickup-point";

export default function useGetPickupPoints(params?: object) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-pickup-point-list"],
    queryFn: () => pickupPointApi.getPickupPoints(params),

    staleTime: Infinity,

    select: ({ data }) => {
      //TODO fix any types
      const pointList = data?.data?.data?.map(
        (point: PickupPointType, i: number) => ({
          ...point,
          key: i,
          label: point.address,
          value: point.id,
        })
      );
      const meta = data?.data?.meta;
      return { pointList, meta };
    },
    // enabled: !!filters,
  });
  return {
    pickupPointList: data?.pointList,
    meta: data?.meta,
    isLoading,
    refetch,
  };
}
