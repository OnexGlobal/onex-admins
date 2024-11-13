import { useQuery } from "@tanstack/react-query";
import { parcelsApi } from "@repo/ui/services/parcels.js";
import { ParcelType } from "@repo/types/src/parcel-type";

export default function useGetParcel(
  filters: Record<string, string | number | null>
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-parcel-list", filters],
    queryFn: () => parcelsApi.getParcels(filters),
    staleTime: Infinity,

    select: ({ data }) => {
      //TODO fix any types
      const parcelList = data?.data?.data?.map(
        (parcel: ParcelType, i: number) => ({
          ...parcel,
          key: i,
          value: parcel?.id || "",
          label: parcel?.name || "",
        })
      );
      const meta = data?.data?.meta;
      return { parcelList, meta };
    },
    // enabled: !!filters,
  });
  return {
    parcelList: data?.parcelList,
    meta: data?.meta,
    isLoading,
    refetch,
  };
}
