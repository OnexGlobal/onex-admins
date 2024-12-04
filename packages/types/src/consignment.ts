export interface Consignment {
  id: number;
  warehouse_id: number;
  dispatch_id: number;
  reference_id: number;
  name: string;
  air_waybill: any;
  am_air_waybill: any;
  total_weight: string;
  total_v_weight: string;
  status: string;
  freight_forwarder: any;
  on_way_date: string;
  destination_date: any;
  estimated_date_from: string;
  estimated_date_to: string;
  comment: any;
  boxes: Box[];
  dispatch: Dispatch;
  warehouse: Warehouse;
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
  error: any;
  attention: any;
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
  iso_3: string;
  country_code: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  description: any;
  warning: any;
  warning_url: any;
  flag: string;
  round_flag: string;
  dispatches: Dispatch2[];
  current_warehouse: CurrentWarehouse;
}

export interface Dispatch2 {
  id: number;
  type: string;
  name: string;
  code: string;
  description: string;
  error: any;
  attention: any;
  estimated_day_from: number;
  estimated_day_to: number;
  rounding: number;
  is_v_weight: number;
  icon: string;
  second_icon: string;
}

export interface CurrentWarehouse {
  id: number;
  warehouse_id: number;
  language_id: number;
  name: string;
  description: any;
  schedule_description: string;
  warning: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
