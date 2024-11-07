import { useQuery } from "@tanstack/react-query";
import { getCurrenciesList } from "@repo/ui/services/currencies";

export default function useGetCurrencies() {
  const { data: currencies } = useQuery({
    queryKey: ["get-currencies"],
    queryFn: () => getCurrenciesList(),
    staleTime: Infinity,
    select: ({ data }) =>
      Object.values(data.data)?.map((curr, i) => ({
        key: i,
        value: curr || "",
        label: curr || "",
      })),
  });

  return { currencies };
}
