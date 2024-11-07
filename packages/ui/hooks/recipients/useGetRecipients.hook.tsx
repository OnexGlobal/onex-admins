import { Paginated } from "@repo/types";
import { Recipient } from "@repo/types/src/users";
import { useQuery } from "@tanstack/react-query";
import { recipientsApi } from "@repo/ui/services/recipients";

export default function useGetRecipients(
  query: null | Record<
    string,
    string | number | undefined | Record<string, string | null>
  >
) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-recipients", query],
    queryFn: () => recipientsApi.getRecipients(query),

    select: ({ data, meta }: Paginated<Recipient[]>) => {
      const recipients = data?.map((recipient, i) => {
        return {
          ...recipient,
          key: i,
          id: recipient?.id,
          label: `${recipient.first_name || ""} ${recipient.last_name || ""} ${
            recipient.company_name || ""
          } ${recipient.user_code}`,
          value: `${recipient.first_name || ""} ${recipient.last_name || ""} ${
            recipient.company_name || ""
          }`.trim(),
        };
      });
      return { recipients, meta };
    },
  });
  return { recipients: data?.recipients, meta: data?.meta, refetch, isLoading };
}
