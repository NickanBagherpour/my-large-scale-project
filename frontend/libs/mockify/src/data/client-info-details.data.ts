import type { ClientInfo, Service } from '@oxygen/types';

export const clientInfo: ClientInfo = {
  grantType: ['Client Flow', 'Password Flow', 'Authorization Code Flow'],
  tags: ['سازمان‌ها و شرکت‌های بزرگ', 'شرکت‌های پرداخت‌ساز _ دانش بنیان و فین‌تک‌ها'],
  clientStatus: 'فعال',
  englishClientName: 'App Bale',
  persianClientName: 'توضیحات مربوط به این کلاینت',
  clientType: ' سامانه های اعتباردهی - اعتبار سنجی هویتی-صورتحساب مالیاتی و اعتباری',
  clientId: '407af44d-f469-413d-81cf-469b21fa',
  authenticationId: '259874565211525',
  websiteAddress: 'http://address.com',
  inputAddress: 'http://address.com',
  clientReturnAddress: 'http://address.com',
  aggregator: 'فرابوم',
  applicantInfo: 'اطلاعات متقاضی',
  username: 'فرزانه اسدی',
  nationalCode: '0110453068',
  organizationName: 'شرکت داده ورزی سداد',
  mobile: '09128600352',
  phone: '021 - 88698541',
  email: 'Farzane@gmail.com',
};

export const services: Service[] = Array.from({ length: 100 }).map(() => ({
  serviceName: 'samat-lc-gutr-del',
  persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
  scope: 'svc-mgmt-iban-inq',
  url: 'localhost:3000/services',
  version: 'V 1.1',
  status: 'status',
  details: 'details',
  remove: 'remove',
}));
