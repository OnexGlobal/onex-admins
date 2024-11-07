export interface WarehouseType {
  id: number;
  reference_id: number;
  type: string;
  address: string;
  country: string;
  iso3?: string;
  country_code: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  description?: string;
  warning?: string;
  warning_url?: string;
  flag: string;
  round_flag: string;
  dispatches: Dispatch[];
  smart_services: SmartService[];
  warehouse_schedule: WarehouseSchedule[];
  current_warehouse: CurrentWarehouse;
}

export interface Dispatch {
  id: number;
  type: string;
  name: string;
  code: string;
  description: string;
  error?: string;
  attention?: string;
  estimated_day_from: number;
  estimated_day_to: number;
  rounding: number;
  is_v_weight: number;
  icon: string;
  second_icon: string;
  forbidden_products: ForbiddenProduct[];
  tariff: Tariff;
  details: Detail[];
}

export interface ForbiddenProduct {
  id: number;
  name: string;
  icon: string;
  second_icon: string;
}

export interface Tariff {
  id: number;
  cost: number;
  v_weight_cost: number;
  min_cost: number;
  start_at: string;
  end_at?: string;
  rounding: number;
  is_v_weight: number;
  sorting: number;
  previous: Previous;
  discounts?: [];
}

export interface Previous {
  cost: number;
  v_weight_cost: number;
}

export interface Detail {
  id: number;
  dispatch_id: number;
  language_id: number;
  name: string;
  description: string;
  error?: string;
  attention?: string;
  estimation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SmartService {
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
}

export interface WarehouseSchedule {
  week_day: string;
  start_time: string;
  end_time: string;
  is_open: number;
}

export interface CurrentWarehouse {
  id: number;
  warehouse_id: number;
  language_id: number;
  name: string;
  description?: string;
  schedule_description: string;
  warning?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
