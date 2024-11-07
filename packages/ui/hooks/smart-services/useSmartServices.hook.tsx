import { useQuery } from "@tanstack/react-query";
import { smartServiceApi } from "@repo/ui/services/smart-services";

export default function useSmartServices() {
  const { data: smartServices } = useQuery({
    queryKey: ["smart-services"],
    queryFn: () => smartServiceApi.getSmartServices(),
    staleTime: Infinity,
    select: ({ data }) => {
      return data?.data?.data?.map((service: ServiceTypes) => ({
        value: service?.id || "",
        label: (
          <div className="flex items-center flex-nowrap">
            <img style={{ width: 25, marginRight: 5 }} src={service.image} />
            {service.current_smart_service.name}
          </div>
        ),
        ...service,
      }));
    },
  });
  return { smartServices };
}

export interface ServiceTypes {
  id: number;
  image: string;
  mobile_image: string;
  cost: string;
  type: string;
  is_active: number;
  is_stop: number;
  is_v_weight: number;
  is_comment: number;
  is_agree: number;
  is_recipient: number;
  is_multi_recipient: number;
  created_at: string;
  details: {
    id: number;
    smart_service_id: number;
    language_id: number;
    name: string;
    description: string;
    warning_description?: null | string;
    created_at?: null | string;
    updated_at?: null | string;
  }[];
  current_smart_service: {
    id: number;
    smart_service_id: number;
    language_id: number;
    name: string;
    description: string;
    warning_description?: null | string;
    created_at?: null | string;
    updated_at?: null | string;
  };
}
