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
  apiVersionsMl: ApiVersionsMl[];
}

export interface ApiVersionsMl {
  id: number;
  api_version_id: number;
  language_id: number;
  title: string;
  description: string;
  created_at: any;
  updated_at: any;
}
