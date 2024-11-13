export interface SubjectType {
  subject_type: string;
  label?: string;
  value?: string;
  key?: number;
}

export interface ActionsHistoryType {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: number;
  causer_type: string;
  causer_id: number;
  properties: Properties;
  created_at: string;
  morph_to: MorphTo;
  causer: Causer;
}

export interface Properties {
  old: Attributes;
  attributes: Attributes;
}

export interface Attributes {
  delivery_type: string;
  pickup_point_id: number;

  [key: string]: string | number;
}

export interface MorphTo {
  id: number;
  user_id: number;
  pickup_point_id: number;
  main_pickup_point_id: number;
  delivery_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  model: string;
}

export interface Causer {
  id: number;
  email: string;
  verified_at: string;
  verified_type: string;
  birthday_date: string;
  prime_start_at: string;
  prime_end_at: string;
  is_prime: number;
  phone: string;
  login_ip: string;
  created_ip: string;
  balance: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user_info: string;
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
  recipient: Recipient;
}

export interface OrdersCountByCountry {
  country: string;
  round_flag: string;
  total: number;
}

export interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old: string;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  correct_first_name: string;
  correct_last_name: string;
  company_name: string;
  georgian_company_name: string;
  document_type: string;
  document_number: string;
  phone: string;
  address: string;
  region_id: number;
  community_id: number;
  gender: string;
  is_resident: string;
  is_person: number;
  is_parent: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
