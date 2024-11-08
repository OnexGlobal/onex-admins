export interface Paginated<T> {
  data: T;
  meta?: Meta;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
  options: Options;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Options {
  total_cost: string;
  total_additional_cost: string;
  total_weight: string;
  total_v_weight: string;
  total_sum?: string;
}
