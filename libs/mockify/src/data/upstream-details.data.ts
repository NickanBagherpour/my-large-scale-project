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
      healthStatus: '1',
      weight: '100',
    },
    {
      domain: 'customer-account-info',
      healthStatus: '0',
      weight: '100',
    },
    {
      domain: 'account-balance',
      healthStatus: '1',
      weight: '100',
    },
    {
      domain: 'account-transaction',
      healthStatus: '1',
      weight: '100',
    },
    {
      domain: 'samat-lc-bal-del',
      healthStatus: '0',
      weight: '100',
    },
    {
      domain: 'samat-lc-col-del',
      healthStatus: '1',
      weight: '100',
    },
  ],
};
