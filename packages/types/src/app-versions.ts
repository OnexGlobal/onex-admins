export interface AppVersionsFilter {
  dev_mode?: number | undefined;
  force_update?: number | undefined;
  os?: string | undefined;
  page?: number;
}

export interface ApiVersions {
  id: number;
  version: string;
  os: string;
  force_update: number;
  dev_mode: number;
  title: string;
  description: string;
  language_id?: number;
  apiVersionsMl: {
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

export interface ApiVersionsMl {
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
}
