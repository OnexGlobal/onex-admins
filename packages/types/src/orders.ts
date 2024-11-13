export interface Filters {
  start_date?: string;
  end_date?: string;
  user_info?: string;
  page?: number;
  per_page?: number;
  order_status?: string;
  cargo_status?: string;
}

export interface FailedOrderData {
  created_at?: string;
  id: number;
  note: string;
  order: OrderData;
  order_id: number;
  process_at: string;
}

export interface OrderData {
  id: number;
  tracking_code: string;
  status: string;
  ready_for_pickup: number;
  real_weight: string;
  weight: string;
  is_volume_weight: number;
  v_weight: string;
  length: number;
  width: number;
  height: number;
  measurement_unit: string;
  size_type?: string;
  customer_comment?: string;
  declaration_price: string;
  declaration_currency: string;
  shop_name: string;
  order_type: string;
  cost: number;
  additional_cost: number;
  is_stop?: string;
  is_dangerous?: string;
  is_missing?: string;
  purchase_type: string;
  estimated_date_from?: string;
  estimated_date_to: string;
  created_at: string;
  histories: History[];
  recipient: Recipient;
  warehouse: Warehouse;
  dispatch: Dispatch;
  parcel: Parcel;
  parcel_id?: number;
  invoice?: { file?: string; name: string };
  custom?: {
    custom_group?: {
      id: number;
      reference_id: number;
      cost: number;
      created_at: string;
      custom_status: {
        id: number;
        custom_group_id: number;
        reference_id: number;
        status: string;
        created_at: string;
      };
      declaration_group?: string;
      custom_tax?: string;
      custom_doc: {
        id: number;
        custom_group_id: number;
        reference_id: number;
        document?: unknown;
        pay_at?: string;
        created_at: string;
        client_current_custom_doc?: unknown;
      };
    };
    custom_status: {
      status: string;

      declaration_group_id: string;
    };
    custom_tax_id: { id: string };
    declaration_group_id: string;
  };
  service: SmartServiceType;
  delivery?: { type: string; delivery_home: { delivery_date: string } };
  category: Category;
  comments?: string[];
  dangerous?: string;
  missing?: string;
  direction_status?: string[];
  pickup_point: PickupPoint;
  warehouse_photos?: string[];
  balances?: string[];
  box: {
    id: number;
    reference_id?: number;
  };
  expected: {
    created_at: string;
    cost: number | string;
  };
  additional_costs: { type: string; cost: string | number }[];
}

export interface History {
  order_id: number;
  key: string;
  date: string;
}

export interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old?: string;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name?: string;
  georgian_company_name?: string;
  document_type: string;
  document_number: string;
  phone: string;
  address: string;
  gender: string;
  region_id: number;
  community_id: number;
  is_parent: number;
  is_person: number;
  created_at: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  verified_type: string;
  email_verified_at?: string;
  birthday_date?: string;
  prime_start_at?: string;
  prime_end_at?: string;
  balance: string;
  bonus: number;
  is_prime: number;
  is_active_admin: number;
  created_et: string;
  full_name: string;
  user_code: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
}

export interface OrdersCountByCountry {
  country: string;
  round_flag: string;
  total: number;
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

export interface Parcel {
  id: number;
  warehouse_id: number;
  dispatch_id: number;
  reference_id: number;
  name: string;
  air_waybill?: string | number;
  am_air_waybill?: string | number;
  total_weight: string;
  total_v_weight: string;
  status: string;
  freight_forwarder?: string;
  on_way_date: string;
  destination_date?: string;
  estimated_date_from: string;
  estimated_date_to: string;
  comment?: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  categoriesMl: CategoriesMl[];
}

export interface CategoriesMl {
  id: number;
  category_id: number;
  language_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface PickupPoint {
  id: number;
  reference_id: string;
  name: string;
  description?: string;
  schedule_description: string;
  address: string;
  phone: string;
  phone2?: string;
  type: string;
  zip?: string;
  warning_message?: string;
  latitude: string;
  longitude: string;
  is_locker?: boolean;
  is_smart_wall: number;
  is_delivery?: boolean;
  images?: string[];
}

export interface SmartServiceType {
  id: number;
  status: string;
  file?: string;
  details: string;
  created_at: string;
  files: File[];
  smart_service: SmartService;
}

export interface File {
  file: string;
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
  current_smart_service: CurrentSmartService;
}

export interface CurrentSmartService {
  id: number;
  smart_service_id: number;
  language_id: number;
  name: string;
  description: string;
  warning_description?: string;
  created_at?: string;
  updated_at?: string;
}
