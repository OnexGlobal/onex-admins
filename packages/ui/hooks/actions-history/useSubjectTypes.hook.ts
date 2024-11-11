import { useQuery } from "@tanstack/react-query";
import { actionsApi } from "../../services/actions-history";
import { SubjectType } from "@repo/types/src/actions-history";

export const useSubjectTypes = () => {
  const { data: subject_types } = useQuery({
    queryKey: ["subject-types"],
    queryFn: () => actionsApi.fetchSubjectTypes(),
    staleTime: Infinity,
    select: ({ data }) =>
      data?.data?.map((type: SubjectType, i: number) => ({
        key: i,
        value: type.subject_type,
        label: type.subject_type?.split("\\")?.pop(),
        ...type,
      })),
  });
  return { subject_types };
};
