export interface RegionsType {
  id?: number;
  region?: string;
  communities: { id?: number; community?: string }[];
  regionMl: unknown;
}
