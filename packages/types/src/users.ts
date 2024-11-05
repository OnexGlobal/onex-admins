import { Dispatch, SetStateAction } from "react";
import { Paginated } from "./pagination";

export interface PrimeUsersSearchType {
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined | null>>
  >;
  refetch: () => void;
}

export interface UserType {
  id: number;
  email: string;
  phone: string;
  label?: string;
  verified_type: string;
  email_verified_at?: string | null;
  birthday_date: string;
  prime_start_at: string;
  prime_end_at?: string | null;
  balance: string;
  bonus: number;
  is_prime: number;
  created_et: string;
  recipient: Recipient1;
  recipients: Recipients[];
  role: Role[];
  full_name: string;
  registered_days: number;
  orders_count: number;
  orders_count_by_country: OrdersCountByCountry[];
}

export interface Recipient {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old: null | string;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name: null | string;
  georgian_company_name: null | string;
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
  label: string;
  user: UserType;
  recipient: UserType;
}

export interface Recipient1 {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old?: string | null;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name?: string | null;
  georgian_company_name?: string | null;
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

export interface Recipients {
  id: number;
  user_id: number;
  user_code: string;
  user_code_old?: string | null;
  first_name: string;
  last_name: string;
  georgian_first_name: string;
  georgian_last_name: string;
  is_resident: string;
  company_name?: string | null;
  georgian_company_name?: string | null;
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

export interface Role {
  id: number;
  name: string;
  created_at: string;
  permissions: Permissions;
}

export interface Permissions {
  role: Role2[];
  region: Region[];
  community: Community[];
  user: User[];
  recipient: Recipient3[];
  warehouse: Warehouse[];
  dispatch: DispatchType[];
  "forbidden-product": ForbiddenProduct[];
  tariff: Tariff[];
  expected: Expected[];
  order: Order[];
  "order-invoice": OrderInvoice[];
  "order-smart-service": OrderSmartService[];
  "smart-service": SmartService[];
  "balance-payment-type": BalancePaymentType[];
  "balance-transfer-type": BalanceTransferType[];
  balance: Balance[];
  "order-custom": OrderCustom[];
  "bonus-type": BonusType[];
  bonus: Bonu[];
  "order-delivery": OrderDelivery[];
  "pickup-point": PickupPoint[];
  "delivery-setting": DeliverySetting[];
  "delivery-home": DeliveryHome[];
  "haypost-parcel": HaypostParcel[];
  parcel: Parcel[];
  box: Box[];
  "parcel-hub": ParcelHub[];
  tag: Tag[];
  "user-note": UserNote[];
  "wholesale-request": WholesaleRequest[];
  "statex-filter": StatexFilter[];
  "tnvd-code": TnvdCode[];
  category: Category[];
  blog: Blog[];
  shop: Shop[];
  "user-first-name": UserFirstName[];
  "user-last-name": UserLastName[];
  "export-sender": ExportSender[];
  "export-recipient": ExportRecipient[];
  export: Export[];
  "ameria-refund": AmeriaRefund[];
  "list-ameria": Amerum[];
  "pay-later": PayLater[];
  "customer-notification": CustomerNotification[];
  "export-blog": ExportBlog[];
  "top-recommendation": TopRecommendation[];
  slider: Slider[];
  "we-are-trusted": WeAreTrusted[];
  "partner-user-by-code": PartnerUserByCode[];
  "header-message": HeaderMessage[];
  "bog-transaction": BogTransaction[];
  dashboard: Dashboard[];
  language: Language[];
  report: Report[];
  "activity-log": ActivityLog[];
  "client-login": ClientLogin[];
}

export interface Role2 {
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

export interface Region {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

export interface Pivot2 {
  role_id: number;
  permission_id: number;
}

export interface Community {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot3;
}

export interface Pivot3 {
  role_id: number;
  permission_id: number;
}

export interface User {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot4;
}

export interface Pivot4 {
  role_id: number;
  permission_id: number;
}

export interface Recipient3 {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot5;
}

export interface Pivot5 {
  role_id: number;
  permission_id: number;
}

export interface Warehouse {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot6;
}

export interface Pivot6 {
  role_id: number;
  permission_id: number;
}

export interface DispatchType {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot7;
}

export interface Pivot7 {
  role_id: number;
  permission_id: number;
}

export interface ForbiddenProduct {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot8;
}

export interface Pivot8 {
  role_id: number;
  permission_id: number;
}

export interface Tariff {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot9;
}

export interface Pivot9 {
  role_id: number;
  permission_id: number;
}

export interface Expected {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot10;
}

export interface Pivot10 {
  role_id: number;
  permission_id: number;
}

export interface Order {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot11;
}

export interface Pivot11 {
  role_id: number;
  permission_id: number;
}

export interface OrderInvoice {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot12;
}

export interface Pivot12 {
  role_id: number;
  permission_id: number;
}

export interface OrderSmartService {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot13;
}

export interface Pivot13 {
  role_id: number;
  permission_id: number;
}

export interface SmartService {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot14;
}

export interface Pivot14 {
  role_id: number;
  permission_id: number;
}

export interface BalancePaymentType {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot15;
}

export interface Pivot15 {
  role_id: number;
  permission_id: number;
}

export interface BalanceTransferType {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot16;
}

export interface Pivot16 {
  role_id: number;
  permission_id: number;
}

export interface Balance {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot17;
}

export interface Pivot17 {
  role_id: number;
  permission_id: number;
}

export interface OrderCustom {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot18;
}

export interface Pivot18 {
  role_id: number;
  permission_id: number;
}

export interface BonusType {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot19;
}

export interface Pivot19 {
  role_id: number;
  permission_id: number;
}

export interface Bonu {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot20;
}

export interface Pivot20 {
  role_id: number;
  permission_id: number;
}

export interface OrderDelivery {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot21;
}

export interface Pivot21 {
  role_id: number;
  permission_id: number;
}

export interface PickupPoint {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot22;
}

export interface Pivot22 {
  role_id: number;
  permission_id: number;
}

export interface DeliverySetting {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot23;
}

export interface Pivot23 {
  role_id: number;
  permission_id: number;
}

export interface DeliveryHome {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot24;
}

export interface Pivot24 {
  role_id: number;
  permission_id: number;
}

export interface HaypostParcel {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot25;
}

export interface Pivot25 {
  role_id: number;
  permission_id: number;
}

export interface Parcel {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot26;
}

export interface Pivot26 {
  role_id: number;
  permission_id: number;
}

export interface Box {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot27;
}

export interface Pivot27 {
  role_id: number;
  permission_id: number;
}

export interface ParcelHub {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot28;
}

export interface Pivot28 {
  role_id: number;
  permission_id: number;
}

export interface Tag {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot29;
}

export interface Pivot29 {
  role_id: number;
  permission_id: number;
}

export interface UserNote {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot30;
}

export interface Pivot30 {
  role_id: number;
  permission_id: number;
}

export interface WholesaleRequest {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot31;
}

export interface Pivot31 {
  role_id: number;
  permission_id: number;
}

export interface StatexFilter {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot32;
}

export interface Pivot32 {
  role_id: number;
  permission_id: number;
}

export interface TnvdCode {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot33;
}

export interface Pivot33 {
  role_id: number;
  permission_id: number;
}

export interface Category {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot34;
}

export interface Pivot34 {
  role_id: number;
  permission_id: number;
}

export interface Blog {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot35;
}

export interface Pivot35 {
  role_id: number;
  permission_id: number;
}

export interface Shop {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot36;
}

export interface Pivot36 {
  role_id: number;
  permission_id: number;
}

export interface UserFirstName {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot37;
}

export interface Pivot37 {
  role_id: number;
  permission_id: number;
}

export interface UserLastName {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot38;
}

export interface Pivot38 {
  role_id: number;
  permission_id: number;
}

export interface ExportSender {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot39;
}

export interface Pivot39 {
  role_id: number;
  permission_id: number;
}

export interface ExportRecipient {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot40;
}

export interface Pivot40 {
  role_id: number;
  permission_id: number;
}

export interface Export {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot41;
}

export interface Pivot41 {
  role_id: number;
  permission_id: number;
}

export interface AmeriaRefund {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot42;
}

export interface Pivot42 {
  role_id: number;
  permission_id: number;
}

export interface Amerum {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot43;
}

export interface Pivot43 {
  role_id: number;
  permission_id: number;
}

export interface PayLater {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot44;
}

export interface Pivot44 {
  role_id: number;
  permission_id: number;
}

export interface CustomerNotification {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot45;
}

export interface Pivot45 {
  role_id: number;
  permission_id: number;
}

export interface ExportBlog {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot46;
}

export interface Pivot46 {
  role_id: number;
  permission_id: number;
}

export interface TopRecommendation {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot47;
}

export interface Pivot47 {
  role_id: number;
  permission_id: number;
}

export interface Slider {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot48;
}

export interface Pivot48 {
  role_id: number;
  permission_id: number;
}

export interface WeAreTrusted {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot49;
}

export interface Pivot49 {
  role_id: number;
  permission_id: number;
}

export interface PartnerUserByCode {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot50;
}

export interface Pivot50 {
  role_id: number;
  permission_id: number;
}

export interface HeaderMessage {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot51;
}

export interface Pivot51 {
  role_id: number;
  permission_id: number;
}

export interface BogTransaction {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot52;
}

export interface Pivot52 {
  role_id: number;
  permission_id: number;
}

export interface Dashboard {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot53;
}

export interface Pivot53 {
  role_id: number;
  permission_id: number;
}

export interface Language {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot54;
}

export interface Pivot54 {
  role_id: number;
  permission_id: number;
}

export interface Report {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot55;
}

export interface Pivot55 {
  role_id: number;
  permission_id: number;
}

export interface ActivityLog {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot56;
}

export interface Pivot56 {
  role_id: number;
  permission_id: number;
}

export interface ClientLogin {
  id: number;
  group: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot57;
}

export interface Pivot57 {
  role_id: number;
  permission_id: number;
}

export interface OrdersCountByCountry {
  country: string;
  round_flag: string;
  total: number;
}
export interface CustomersSearchType {
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined>>
  >;
  refetch: () => void;
}
export interface CustomersTableType {
  recipients?: Recipient[];
  meta?: Paginated<any>["meta"];
  filter?: Record<string, string | number | undefined>;
  setFilter: Dispatch<
    SetStateAction<Record<string, string | number | undefined>>
  >;
}
