export enum FILTERS {
  day = "day",
  week = "week",
  month = "month",
  year = "year",
}

export interface FilterAsProps {
  filter_type?: FILTERS;
  start_date?: string;
  end_date?: string;
  time_statement?: string;
  property?: string;
}

export interface Last4BoxesType {
  dashboardData: DashboardData;
  isLoading?: boolean;
  filterType: string;
}

export interface DashboardData {
  all_info: AllInfo;
  app_downloads_info: AppDownloadsInfo;
  registration_by_user_type_info: RegistrationByUserTypeInfo;
  registration_by_nationality_info: RegistrationByNationalityInfo;
  registration_by_gender_info: RegistrationByGenderInfo;
  registration_by_time_info: any[];
  registration_by_region_info: any[];
  order_info: {
    round_flag: string;
    total: number;
    total_weight: number;
    avg_weight: number;
    percentage_expression: number;
    sum_expression: number;
  }[];
  filter_type: string;
  current_start_date: string;
  current_end_date: string;
  previous_start_date: string;
  previous_end_date: string;
}

export interface AllInfo {
  all_total: number;
  all_sum_expression: number;
  all_percentage_expression: number;
  completed_total: number;
  completed_sum_expression: number;
  completed_percentage_expression: number;
  completed_percentage_in_all: string;
  incompleted_total: number;
  incompleted_sum_expression: number;
  incompleted_percentage_expression: number;
  incompleted_percentage_in_all: string;
  incompleted_percentage_in_dirty_unverified: string;
  unverified_total: number;
  unverified_sum_expression: number;
  unverified_percentage_expression: number;
  unverified_percentage_in_all: number;
  unverified_percentage_in_dirty_unverified: string;
}

export interface AppDownloadsInfo {
  ios_total: number;
  ios_sum_expression: number;
  ios_percentage_expression: number;
  ios_percentage_in_completed: string;
  android_total: number;
  android_sum_expression: number;
  android_percentage_expression: number;
  android_percentage_in_completed: string;
}

export interface RegistrationByUserTypeInfo {
  users_total: number;
  users_sum_expression: number;
  users_percentage_expression: number;
  users_percentage_in_completed: string;
  companies_total: number;
  companies_sum_expression: number;
  companies_percentage_expression: number;
  companies_percentage_in_completed: string;
  unspecified_total: number;
  unspecified_sum_expression: number;
  unspecified_percentage_expression: number;
  unspecified_percentage_in_completed: string;
}

export interface RegistrationByNationalityInfo {
  foreigner_total: number;
  foreigner_sum_expression: number;
  foreigner_percentage_expression: number;
  foreigner_percentage_in_completed: string;
  georgian_total: number;
  georgian_sum_expression: number;
  georgian_percentage_expression: number;
  georgian_percentage_in_completed: string;
}

export interface RegistrationByGenderInfo {
  males_total: number;
  males_sum_expression: number;
  males_percentage_expression: number;
  males_percentage_in_completed: string;
  females_total: number;
  females_sum_expression: number;
  females_percentage_expression: number;
  females_percentage_in_completed: string;
  unspecified_total: number;
  unspecified_sum_expression: number;
  unspecified_percentage_expression: number;
  unspecified_percentage_in_completed: string;
}
