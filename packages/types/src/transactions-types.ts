export interface BalancePaymentType {
  id: number;
  name?: string;
}

export interface TransactionsTypes {
  id: number;
  user_id?: number;
  admin_id: null | string;
  order_id: null | string;
  balance_transfer_type_id?: number | string;
  balance_payment_type_id?: null | string;
  is_invoice?: number | boolean;
  type?: string;
  sum?: string;
  comment?: null | string;
  created_at?: string;
  updated_at?: string;
  balance_transfer_type: BalancePaymentType;
  balance_payment_type?: BalancePaymentType;
  admin?: null;
  user: {
    id: number;
    email: string;
    phone: string;
    verified_type: string;
    email_verified_at?: null | string;
    birthday_date?: null;
    prime_start_at?: null | string;
    prime_end_at?: null | string;
    balance?: string;
    bonus?: number;
    is_prime?: number | boolean;
    created_et?: string;
    recipient: {
      id: number;
      user_id: number;
      user_code: string;
      user_code_old: null | string;
      first_name: string;
      last_name: string;
      is_resident: 1;
      company_name: null;
      inn_number: string;
      document_type: string;
      document_number: string;
      document_front_file: string;
      document_reverse_file: string;
      visa_scan: null;
      phone: string;
      address: string;
      gender: "male" | "female" | "other";
      region_id: number;
      community_id: number;
      is_parent: number;
      is_person: number;
      created_at: string;
      georgian_first_name?: string;
      georgian_company_name?: string;
      georgian_last_name?: string;
    };
    full_name?: string;
    registered_days?: number;
    orders_count?: number;
    orders_count_by_country: [
      {
        country?: string;
        round_flag?: string;
        total?: number;
      },
    ];
  };
}
