export interface LanguagesType {
  id: number;
  name: string;
  flag: string;
  code: string;
}

export interface BannersType {
  id: number;
  text: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  language_id: number;
  details: {
    id: number;
    header_message_id: number;
    language_id: number;
    text: string;
  }[];
}

export interface SlidesType {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  button_name: string;
  priority: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  language_id?: number;
  slidersMl: {
    id: number;
    slider_id: number;
    language_id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    button_name: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface BlogType {
  id: number;
  url: string;
  image: string;
  title: string;
  description: string;
  button_name: string;
  is_active: number;
  priority: number;
  created_at: string;
  updated_at: string;
  key: number | string;
  label: string;
  value: number | string;
  language_id?: number;
  blogsMl: {
    id: number;
    blog_id: number;
    language_id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    button_name: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface ShopsType {
  id: number;
  blog_url: string;
  name: string;
  url: string;
  affilate_url: string;
  logo: string;
  mobile_logo: string;
  description: string;
  price: number;
  is_buyforme: number;
  is_dropify: number;
  is_one_click: number;
  is_special: number;
  vlog: string;
  for_home_page: number;
  is_active: number;
  sorting: number;
  created_at: string;
  updated_at: string;
  rating: string;
  categories: {
    id: number;
    name: string;
    type: string;
  }[];
  details: {
    id: number;
    shop_id: number;
    language_id: number;
    description: string;
    vlog: string;
    created_at: string;
    updated_at?: string;
  }[];
  blog: string;
  warehouse: {
    id: number;
    reference_id: number;
    type: string;
    address: string;
    country: string;
    iso_3: string;
    country_code: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    flag: string;
    round_flag: string;
    warning_url: string;
    timezone: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
}
