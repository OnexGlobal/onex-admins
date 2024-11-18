import { useQuery } from "@tanstack/react-query";
import { GetRegions } from "../services/regions";
import { RegionsType } from "@repo/types/src/regions-types";
export default function useRegions() {
  const { data: regions } = useQuery({
    queryKey: ["get-regions"],
    queryFn: () => GetRegions(),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data?.data?.map((reg: RegionsType) => ({
        ...reg,
        value: reg?.id || "",
        label: reg?.region || "",
        communities: reg?.communities?.map((com) => ({
          value: com?.id || "",
          label: com?.community || "",
          ...com,
        })),
      }));
    },
  });
  return { regions };
}
