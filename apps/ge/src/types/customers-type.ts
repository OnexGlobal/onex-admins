import { Dispatch, SetStateAction } from "react";
import { MetaType } from "./meta-type";

export interface CustomersTableType {
  recipients?: [];
  meta?: MetaType;
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined>>
  >;
}

export interface CustomersSingleType {
  permissions?: [];
  clientLogin?: boolean;
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
  recipient?: UserType | null;
  setRecipient: Dispatch<SetStateAction<null | Record<string, unknown>>>;
  refetch: () => void;
}
