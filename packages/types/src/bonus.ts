export interface BonusDataType {
  id: number;
  admin_id?: string;
  type: string;
  given_date: string;
  expire_date?: string;
  sum: number;
  remain: number;
  bonus_type: BonusType;
  user: User;
}

export interface BonusType {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  current_bonus_type: CurrentBonusType;
}

export interface CurrentBonusType {
  id: number;
  bonus_type_id: number;
  language_id: number;
  name: string;
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
  recipient: Recipient;
  full_name: string;
  user_code: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
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
  company_name: string;
  georgian_company_name: string;
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
}

export interface OrdersCountByCountry {
  country: string;
  round_flag: string;
  total: number;
}
