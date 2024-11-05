export type UpstreamDetails = {
  domain: string;
  healthStatus: string;
  weight: string;
};

export const servicesList: UpstreamDetails[] = [
  {
    domain: 'upstream-details',
    healthStatus: 'سالم',
    weight: '100',
  },
  {
    domain: 'customer-account-info',
    healthStatus: 'ناسالم',
    weight: '100',
  },
  {
    domain: 'account-balance',
    healthStatus: 'سالم',
    weight: '100',
  },
  {
    domain: 'account-transaction',
    healthStatus: 'سالم',
    weight: '100',
  },
  {
    domain: 'samat-lc-bal-del',
    healthStatus: 'ناسالم',
    weight: '100',
  },
  {
    domain: 'samat-lc-col-del',
    healthStatus: 'سالم',
    weight: '100',
  },
];
