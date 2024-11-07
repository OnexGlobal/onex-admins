export interface ExpectedOrdersType {
  id: number;
  tracking_code: string;
  shop_name: string;
  customer_comment?: null | string;
  declaration_price: number;
  declaration_currency: string;
  is_active: number;
  order_type?: string;
  category: {
    id: number;
    name: string;
    type: string;
  };
  created_at: string;
  user: User;
  warehouse: Warehouse;
  dispatch: Dispatch;
  recipient: Recipient;
  invoice: {
    id: number;
    expected_id: number;
    order_id?: string | number;
    status: string;
    customs_status?: string;
    comment?: string;
    name: string;
    file: string;
  };
  order_smart_services: {
    id?: number;
    status?: string;
    file?: string;
    details: string;
    created_at: string;
    smart_service: {
      id?: number;
      image?: string;
      mobile_image?: string;
      cost?: string;
      type?: string;
      is_active?: number;
      is_stop?: number;
      is_v_weight?: number;
      is_comment?: number;
      is_agree?: number;
      is_recipient?: number;
      is_multi_recipient?: number;
      created_at?: string;
      description?: string;
      current_smart_service?: {
        id: number;
        smart_service_id: number;
        language_id: number;
        name: string;
        description: string;
        warning_description?: string;
        created_at?: string;
        updated_at?: string;
      };
    };
  };
}

export interface User {
  id: number;
  email: string;
  phone: string;
  verified_type: string;
  email_verified_at?: null | string;
  birthday_date?: null | string;
  prime_start_at?: null | string;
  prime_end_at?: null | string;
  balance: string;
  bonus: number;
  is_prime: number;
  created_et: string;
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
  user_code?: string;
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
  iso3?: null | string;
  country_code: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  description?: null | string;
  warning?: null | string;
  warning_url?: null | string;
  flag: string;
  round_flag: string;
  current_warehouse: CurrentWarehouse;
}

export interface CurrentWarehouse {
  id: number;
  warehouse_id: number;
  language_id: number;
  name: string;
  description?: null | string;
  schedule_description: string;
  warning?: null | string;
  created_at?: null | string;
  updated_at?: null | string;
  deleted_at?: null | string;
}

export interface Dispatch {
  id: number;
  type: string;
  name: string;
  code: string;
  description: string;
  error?: null | string;
  attention?: null | string;
  estimated_day_from: number;
  estimated_day_to: number;
  rounding: number;
  is_v_weight: number;
  icon: string;
  second_icon: string;
  warehouse?: Warehouse;
}

export interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old?: null | string;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name?: null | string;
  georgian_company_name?: null | string;
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
  user?: User;
}
