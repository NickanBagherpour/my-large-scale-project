export const drafts = [
  { name: 'svc-mgmt-sapta-bale-mob-birthdate', level: 2, id: 1 },
  { name: 'customer-account-info', level: 3, id: 2 },
] as const;

export type Service = {
  name: string;
  persianName: string;
  scope: string;
  url: string;
  version: string;
  status: boolean;
};

export const servicesList: Service[] = [
  {
    name: 'svc-mgmt-sapta-bale-mob-birthdate',
    persianName: 'دریافت کد های ملی متعلق به یک شماره موبایل',
    scope: 'svc-mgmt-sapta-bale-mob-birthdate',
    url: 'http://svc-mgmt-sapta-bale-mob-birthdate',
    version: 'v1',
    status: false,
  },
  {
    name: 'customer-account-info',
    persianName: 'سرویس حساب اطلاعات مشتری',
    scope: 'svc-mgmt-customer-account-deposit-info',
    url: 'http://customer-account-info',
    version: 'v1',
    status: true,
  },
  {
    name: 'account-balance',
    persianName: 'سرویس مانده حساب مشتری',
    scope: 'svc-mgmt-account-balance',
    url: 'http://account-balance-sandbox',
    version: 'v1',
    status: false,
  },
  {
    name: 'account-transaction',
    persianName: 'سرویس تراکنش های حساب',
    scope: 'svc-mgmt-account-trx',
    url: 'http://account-transaction',
    version: 'v1',
    status: false,
  },
  {
    name: 'samat-lc-bal-del',
    persianName: 'سرویس حذف تسویه اعتبارات اسنادی',
    scope: 'svc-mgmt-samat-lc-bal-del',
    url: 'http://samat-lc-bal-del',
    version: 'v1',
    status: true,
  },
  {
    name: 'samat-lc-col-del',
    persianName: 'سرویس حذف وثایق اعتبارات اسنادی',
    scope: 'svc-mgmt-samat-lc-col-del',
    url: '[host:port]/api/samat/v1/lc/collateral/delete',
    version: 'v1',
    status: false,
  },
  {
    name: 'samat-lc-gutr-del',
    persianName: 'سرویس حذف ضامنین اعتبارات اسنادی',
    scope: 'svc-mgmt-samat-lc-gutr-del',
    url: 'http://samat-lc-gutr-del',
    version: 'v1',
    status: false,
  },
  {
    name: 'samat-loan-bal-del',
    persianName: 'سرویس حذف تسویه تسهیلات',
    scope: 'svc-mgmt-samat-loan-bal-del',
    url: 'http://samat-loan-bal-del',
    version: 'v1',
    status: true,
  },
  {
    name: 'samat-loan-col-del',
    persianName: 'سرویس حذف وثایق تسهیلات',
    scope: 'svc-mgmt-samat-loan-col-del',
    url: 'http://samat-loan-col-del',
    version: 'v1',
    status: false,
  },
  {
    name: 'samat-loan-gutr-del',
    persianName: 'سرویس حذف ضامنین تسهیلات',
    scope: 'svc-mgmt-samat-loan-col-del',
    url: 'http://samat-loan-gutr-del',
    version: 'v1',
    status: false,
  },
  {
    name: 'samat-guar-bal-del',
    persianName: 'سرویس حذف تسویه ضمانت نامه',
    scope: 'busvc-mgmt-samat-loan-col-delg',
    url: 'http://samat-guar-bal-del',
    version: 'v1',
    status: true,
  },
  {
    name: 'samat-guar-col-del',
    persianName: 'سرویس حذف وثایق ضمانت نامه',
    scope: 'svc-mgmt-samat-loan-col-del',
    url: 'http://samat-guar-col-del',
    version: 'v1',
    status: false,
  },
];
