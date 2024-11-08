import type { PermissionObject } from "./permissions";

export interface RolesDataType {
  id: number;
  name: string;
  created_at: string;
  permissions: PermissionObject;
  users: User[];
}

export interface Pivot {
  role_id: number;
  model_id: number;
  model_type: string;
  permission_id: number;
}

export interface PerListItemType {
  id: number;
  name: string;
  group: string;
}

interface User {
  id: number;
  email: string;
  verified_at: string;
  verified_type?: string;
  birthday_date?: string;
  prime_start_at: string;
  prime_end_at?: string;
  is_prime: number;
  phone: string;
  login_ip: string;
  created_ip?: string;
  balance: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  full_name?: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
  pivot: Pivot;
  recipient?: Recipient;
}

export interface OrdersCountByCountry {
  country: string;
  round_flag: string;
  total: number;
}

interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old?: string;
  first_name: string;
  last_name: string;
  georgian_first_name?: string;
  georgian_last_name?: string;
  correct_first_name?: string;
  correct_last_name?: string;
  company_name: string;
  georgian_company_name: string;
  document_type?: string;
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
