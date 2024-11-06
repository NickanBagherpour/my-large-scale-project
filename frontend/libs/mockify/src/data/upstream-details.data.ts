export type UpstreamDetails = {
  name: string;
  persianName: string;
  serverList: {
    domain: string;
    healthStatus: string;
    weight: string;
  }[];
};

export const upstreamDetailsList: UpstreamDetails = {
  name: 'api-services-upstream',
  persianName: 'آپ‌استریم سرویس‌های فعال',

  serverList: [
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
  ],
};
