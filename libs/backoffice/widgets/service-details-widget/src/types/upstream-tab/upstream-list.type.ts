export interface UpstreamListTarget {
  domain: string;
  weight: number;
}

export interface UpstreamListData {
  name: string;
  description: string;
  targets: UpstreamListTarget[];
}
