import { headers } from 'next/headers';
import { config } from './../../../../../apps/customer-portal/src/middleware';
import { withErrorHandling } from '@oxygen/utils';
import { useQuery } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';
import { client, portalUrl } from '@oxygen/client';

type params = {
  name?: string;
  query: string;
};

export type ClientService = {
  title: string;
  subTitle: string;
  serviceName: string;
  persianName: string;
  scope: string;
  url: string;
  version: string;
  status: string;
};

const mockData: ClientService[] = [
  {
    title: 'دریافت کد‌های ملی متعلق به یک شمارهn موبایل',
    subTitle: 'svc-gfg-bhhj-ngdc-zxzxc-zxc',
    serviceName: 'samat-lc-gutr-del222',
    persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
    scope: 'svc-mgmt-iban-inq',
    url: 'http://localhost:3000/client-creation',
    version: 'V 1.1',
    status: 'status',
  },

  {
    title: 'دریافت اشتراک شماره های بله و ساینا بر اساس ماه و روز تولد',
    subTitle: 'svc-gfg-bhhj-ngdc-zxzxc-zxc',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت اشتراک شماره های بله و ساینا بر اساس ماه و روز تولد',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'بررسی وضعیت حساب بانکی به وسیله کد ملی',
    subTitle: 'svc-abc-xztf-kfgv-pqlmn-jki',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'بررسی وضعیت حساب بانکی به وسیله کد ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'دریافت اطلاعات بیمه بر اساس شماره کارت ملی',
    subTitle: 'svc-lki-wqqr-nbdj-fvxtr-yuio',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت اطلاعات بیمه بر اساس شماره کارت ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'دریافت تاریخچه تراکنش‌های بانکی با شماره موبایل',
    subTitle: 'svc-xyz-lopf-zsed-qwert-tyu',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت تاریخچه تراکنش‌های بانکی با شماره موبایل',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'ثبت نام در سامانه خدمات الکترونیکی با کد ملی',
    subTitle: 'svc-hjk-tyui-lkjh-vbmn-azsx',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'ثبت نام در سامانه خدمات الکترونیکی با کد ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'دریافت جزئیات حساب‌های بانکی از طریق شماره حساب',
    subTitle: 'svc-pqlm-kjbv-xcvb-sdfg-rtyu',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت جزئیات حساب‌های بانکی از طریق شماره حساب',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'استعلام وضعیت مالیاتی به وسیله شماره کارت ملی',
    subTitle: 'svc-mnbv-cxwr-qwer-jlkj-hgtr',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'استعلام وضعیت مالیاتی به وسیله شماره کارت ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'دریافت اطلاعات وام‌ها بر اساس شماره ملی',
    subTitle: 'svc-jklo-pqrt-uytr-jkjl-hjkl',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت اطلاعات وام‌ها بر اساس شماره ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
  {
    title: 'دریافت وضعیت املاک و مستغلات با کد ملی',
    subTitle: 'svc-xcvz-ytuf-ghjb-nbvc-plmj',
    serviceName: 'samat-lc-gutr-del',
    persianName: 'دریافت وضعیت املاک و مستغلات با کد ملی',
    scope: 'svc-mgmt-iban-inq',
    url: 'localhost:3000',
    version: 'V 1.1',
    status: 'status',
  },
];

const Api = {
  getClientService: async (params: params, callServerAPI?: boolean) => {
    const { query, ...restParams } = params;
    if (!callServerAPI) {
      return new Promise<{ data: ClientService[] }>((res) => {
        const data = mockData.filter((item) => item.title.includes(params.query));
        setTimeout(() => {
          res({ data });
        }, 1000);
      });
    } else {
      console.log(client);
      return client.get(
        /*<ReportResponseType>*/ `${portalUrl}/v1/services/search?query=${query}`,
        // {},
        {
          headers: {},
        }
      );
    }
  },
};

export const useGetClientService = (params: params, callServerAPI?: boolean) => {
  return useQuery({
    enabled: !!params.query,
    queryKey: [RQKEYS.REUSABLE_COMPONENTS.CLIENT_SERVICES, params],
    queryFn: withErrorHandling(
      () => Api.getClientService(params, callServerAPI),
      () => void 1
    ),
  });
};
