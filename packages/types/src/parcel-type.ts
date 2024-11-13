export interface ParcelType {
  id: number;
  warehouse_id: number;
  dispatch_id: number;
  reference_id: number;
  name: string;
  air_waybill?: string;
  am_air_waybill?: string;
  total_weight: string;
  total_v_weight: string;
  status: string;
  freight_forwarder?: string;
  on_way_date: string;
  destination_date?: string;
  estimated_date_from: string;
  estimated_date_to: string;
  comment?: string;
  boxes: Box[];
  dispatch: Dispatch;
  warehouse: Warehouse;
  label: string;
}

export interface Box {
  id: number;
  parcel_id: number;
  reference_id: number;
  tracking_code: string;
  total_weight: string;
  total_v_weight: string;
  width: string;
  length: string;
  height: string;
  orders_count: number;
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
}

export interface Warehouse {
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
  current_warehouse: CurrentWarehouse;
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
