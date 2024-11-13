export interface MetaType {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url?: string;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
  options?: {
    total_cost?: string;
    total_additional_cost?: string;
    total_weight?: string;
    total_v_weight?: string;
    total_sum?: number;
  };
}
