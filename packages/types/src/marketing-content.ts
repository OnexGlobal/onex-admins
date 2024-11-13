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
