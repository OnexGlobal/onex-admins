export interface PickupPointType {
  id: number;
  reference_id: string;
  name: string;
  description?: string;
  schedule_description: string;
  address: string;
  phone: string;
  phone2?: string;
  type: string;
  zip?: string;
  warning_message?: string;
  latitude: string;
  longitude: string;
  is_locker?: number;
  is_smart_wall: number;
  is_delivery?: number;
  region: Region;
  community: Community;
  pickup_point_schedule: PickupPointSchedule[];
  pickup_point_languages: PickupPointLanguage[];
  images: unknown[];
}

export interface Region {
  id: number;
  region: string;
}

export interface Community {
  id: number;
  community: string;
}

export interface PickupPointSchedule {
  week_day: string;
  start_time: string;
  end_time: string;
  is_open: number;
}

export interface PickupPointLanguage {
  id: number;
  pickup_point_id: number;
  language_id: number;
  name: string;
  description?: string;
  schedule_description: string;
  warning_message?: string;
  address: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
