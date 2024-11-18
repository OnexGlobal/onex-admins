import { Meta } from "./pagination";
import { Dispatch, SetStateAction } from "react";
import { Recipient } from "./users";

export interface CustomersTableType {
  recipients?: [];
  meta?: Meta;
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined>>
  >;
}

export interface CustomersSingleType {
  permissions?: [];
  clientLogin?: boolean;
  recipient_edit?: boolean;
}

export interface CustomersSearchType {
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined>>
  >;
  refetch: () => void;
}

export interface CustomersBlockType {
  status?: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export interface UserType {
  id?: number;
  user_id: number;
  user_code: string;
  user_code_old: string | null;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name: null;
  document_type: string;
  document_number: string;
  phone: string;
  address: string;
  gender: string;
  region_id: number;
  community_id: number;
  is_parent: 1 | 0;
  is_person: 1 | 0;
  created_at: string | null;
  inn_number?: string | number;
  user: {
    id: number;
    email: string;
    phone: string;
    verified_type: string;
    email_verified_at: null | string;
    birthday_date: null | string;
    prime_start_at: null | string;
    prime_end_at: null | string;
    balance: string | number;
    bonus: number;
    is_prime: number;
    created_et: string;
    full_name: string;
    registered_days: number;
    orders_count: number;
    orders_count_by_country: unknown[];
    recipient?: Record<string, string | number>;
  };
}

export interface EditRecipientType {
  recipient?: Recipient | null;
  setRecipient: Dispatch<SetStateAction<null | Recipient>>;
  refetch: () => void;
}
export interface AccountDetailsTypes {
  balance?: string;
  birthday_date?: string | null;
  blocked_accounts?: [];
  bonus?: number;
  created_et?: string;
  current_blocked_account?: null | Record<string, string | number>;
  email?: string;
  email_verified_at?: null;
  full_name?: string;
  id?: number;
  is_prime?: number;
  orders_count?: number;
  orders_count_by_country: {
    country: string;
    round_flag: string;
    total: number;
  }[];
  orders_history: Record<string, number>;
  phone: string;
  prime_end_at: null | string;
  verified_type?: string;
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
  user_pickup_point: {
    delivery_type: string;
    pickup_point: {
      id: 1;
      reference_id: string | null;
      name: string | null;
      description: string | null;
      schedule_description: string | null;
      address: string | null;
      phone: string | null;
      phone2: string | null;
      type: string | null;
      zip: null | string | number;
      warning_message: null;
      latitude?: string | null | number;
      longitude?: string | null | number;
      is_locker: null | number | string;
      is_smart_wall?: number | null;
      is_delivery?: null | number | string;
    };
    main_pickup_point: null | string;
  };

  settings: {
    push?: "on" | "off" | null;
    email?: "on" | "off" | null;
    notification_lang?: "en" | "ru";
    news_email?: "on" | "off" | null;
    events_email?: "on" | "off" | null;
    at_warehouse_push?: "on" | "off" | null;
    at_warehouse_email?: "on" | "off" | null;
    on_way_push?: "on" | "off" | null;
    on_way_email?: "on" | "off" | null;
    in_local_country_push?: "on" | "off" | null;
    in_local_country_email?: "on" | "off" | null;
    promo_email?: "on" | "off" | null;
    smart_wall_voice?: "on" | "off" | null;
    smart_wall_voice_name?: "on" | "off" | null;
    smart_wall_lang?: "en" | "ru";
    fill_balance?: "on" | "off" | null;
    bonus?: "on" | "off" | null;
  };
  registered_days?: number;
}
