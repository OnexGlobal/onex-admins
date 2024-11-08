import { Report } from "./users";

export interface UserType {
  id: number;
  email: string;
  phone: string;
  verified_type: string;
  email_verified_at: null | string;
  birthday_date: null | string;
  prime_start_at: null | string;
  prime_end_at: null | string;
  balance: string;
  bonus: number;
  is_prime: number;
  is_active_admin: number;
  created_et: string;
  recipient: Recipient;
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country?: object[];
}

export interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old: string | null;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name: string | null;
  georgian_company_name: string | null;
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
  user?: {
    is_prime?: boolean;
  };
}

export interface BalancesList {
  id: number;
  user_id: number;
  admin_id: number;
  order_id: number | string;
  balance_transfer_type_id: number;
  balance_payment_type_id: null | number | string;
  is_invoice: number;
  type: string;
  sum: string;
  comment?: string;
  created_at: string;
  updated_at: string;
  balance_transfer_type: BalanceTransferType;
  balance_payment_type: BalanceTransferType;
  admin: Admin;
  user: User2;
}

export interface BalanceTableMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface BalanceTransferType {
  id: number;
  name: string;
}

export interface Admin {
  id: number;
  email: string;
  phone: string;
  verified_type: null | string;
  email_verified_at: null | string;
  birthday_date: string;
  prime_start_at: null | string;
  prime_end_at: null | string;
  balance: string;
  bonus: number;
  is_prime: number;
  is_active_admin: number;
  created_et: string;
  role: Role[];
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country?: object[];
}

export interface Role {
  id: number;
  name: string;
  created_at: string;
  permissions: Permissions;
}

export interface Permissions {
  role: Group[];
  region: Group[];
  community: Group[];
  user: Group[];
  recipient: Recipient[];
  warehouse: Group[];
  dispatch: Group[];
  "forbidden-product": Group[];
  tariff: Group[];
  expected: Group[];
  order: Group[];
  "order-invoice": Group[];
  "order-smart-service": Group[];
  "smart-service": Group[];
  "balance-payment-type": Group[];
  "balance-transfer-type": Group[];
  balance: Group[];
  "order-custom": Group[];
  "bonus-type": Group[];
  bonus: Group[];
  "order-delivery": Group[];
  "pickup-point": Group[];
  "delivery-setting": Group[];
  "delivery-home": Group[];
  "haypost-parcel": Group[];
  parcel: Group[];
  box: Group[];
  "parcel-hub": Group[];
  tag: Group[];
  "user-note": Group[];
  "wholesale-request": Group[];
  "statex-filter": Group[];
  "tnvd-code": Group[];
  category: Group[];
  blog: Group[];
  shop: Group[];
  "user-first-name": Group[];
  "user-last-name": Group[];
  "export-sender": Group[];
  "export-recipient": Group[];
  export: Group[];
  "ameria-refund": Group[];
  "list-ameria": Group[];
  "pay-later": Group[];
  "customer-notification": Group[];
  "export-blog": Group[];
  "top-recommendation": Group[];
  slider: Group[];
  "we-are-trusted": Group[];
  "partner-user-by-code": Group[];
  "header-message": Group[];
  "bog-transaction": Group[];
  dashboard: Group[];
  language: Group[];
  report: Report[];
  "activity-log": Group[];
  "client-login": Group[];
  story: Group[];
  "api-version": Group[];
  "tariff-discount": Group[];
}

export interface Group {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  role_id: number;
  permission_id: number;
}

export interface Pivot60 {
  role_id: number;
  permission_id: number;
}

export interface User2 {
  id: number;
  email: string;
  phone: string;
  verified_type: string;
  email_verified_at: string | null;
  birthday_date: string | null;
  prime_start_at: string | null;
  prime_end_at: string | null;
  balance: string;
  bonus: number;
  is_prime: number;
  is_active_admin: number;
  created_et: string;
  recipient: UserType;
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country?: object[];
}

export interface UserType {
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
}
