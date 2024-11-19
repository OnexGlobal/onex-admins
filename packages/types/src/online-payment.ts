export type RefundType =
  | false
  | {
      id?: number | undefined;
      request_amount: string | number;
      refund_amount: string | number;
    };

export interface OnlinePaymentItem {
  id: number;
  order_id: string;
  industry: string;
  capture: string;
  status: string;
  currency_code: string;
  request_amount: string;
  transfer_amount: string;
  refund_amount: string;
  create_date: string;
  expire_date: string;
  transfer_method: string;
  transaction_id?: string;
  payer_identifier?: string;
  payment_option: string;
  save_card: number;
  reject_reason?: string;
  created_at: string;
  items: Item[];
  user: User;
}

export interface Item {
  id: number;
  "bog_transaction_id ": number;
  description: string;
  quantity: number;
  unit_price: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  verified_type: string;
  email_verified_at: string;
  birthday_date: string;
  prime_start_at: string;
  prime_end_at: string;
  balance: string;
  bonus: number;
  is_prime: number;
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
  user_code_old: string;
  first_name: string;
  last_name: string;
  georgian_first_name?: string;
  georgian_last_name?: string;
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
