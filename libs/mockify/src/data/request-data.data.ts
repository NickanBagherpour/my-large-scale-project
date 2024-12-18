export const drafts = [
  { name: 'svc-mgmt-sapta-bale-mob-birthdate', level: 2, id: 1 },
  { name: 'customer-account-info', level: 3, id: 2 },
] as const;

export type RequestInfo = {
  legal_person_name: string;
  national_id: string;
  legal_person_type: string;
  registration_number: string;
  registration_date: string;
  activity_field: string;
  economy_code: string;
  last_registration_address: string;
  postal_code: string;
  phone: string;
  legal_name: string;
  mobile_number: string;
  telephone: string;
  technical_name: string;
  requestedServiceDat: RequestedData[];
};

export type RequestedData = {
  serviceName: string;
  persianName: string;
};

export const requestData: RequestInfo = {
  legal_person_name: 'شرکت داده پرداز مانا دی سلامت',
  national_id: '14009904586',
  legal_person_type: 'سهامی عام',
  registration_number: '575229',
  registration_date: '1399/12/28',
  activity_field: 'الکترونیک',
  economy_code: '14009904586',
  last_registration_address: 'شهر تهران، مهران، کوچه بارانک نهم، خیابان شهید نوراله کمانی (فرهنگ شمالی)، پلاک 2',
  postal_code: '1471876956',
  phone: '02155366655',
  legal_name: 'نام و نام خانوادگی',
  mobile_number: '09123456789',
  telephone: '02133445566',
  technical_name: 'نام و نام خانوادگی',
  requestedServiceDat: [
    {
      serviceName: 'svc-mgmt-sapta-bale-mob-birthdate',
      persianName: 'دریافت کد های ملی متعلق به یک شماره موبایل',
    },
    {
      serviceName: 'customer-account-info',
      persianName: 'سرویس حساب اطلاعات مشتری',
    },
    {
      serviceName: 'account-balance',
      persianName: 'سرویس مانده حساب مشتری',
    },
    {
      serviceName: 'account-transaction',
      persianName: 'سرویس تراکنش های حساب',
    },
    {
      serviceName: 'samat-lc-bal-del',
      persianName: 'سرویس حذف تسویه اعتبارات اسنادی',
    },
    {
      serviceName: 'samat-lc-col-del',
      persianName: 'سرویس حذف وثایق اعتبارات اسنادی',
    },
    {
      serviceName: 'samat-lc-gutr-del',
      persianName: 'سرویس حذف ضامنین اعتبارات اسنادی',
    },
  ],
};
