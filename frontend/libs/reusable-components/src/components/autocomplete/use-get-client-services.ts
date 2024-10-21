import { withErrorHandling } from '@oxygen/utils';
import { useQuery } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';

type params = {
  name: string;
};

export type ClientService = {
  title: string;
  subTitle: string;
};

const mockData: ClientService[] = [
  { title: 'دریافت کد‌های ملی متعلق به یک شماره موبایل', subTitle: 'svc-gfg-bhhj-ngdc-zxzxc-zxc' },
  { title: 'دریافت اشتراک شماره های بله و ساینا بر اساس ماه و روز تولد', subTitle: 'svc-gfg-bhhj-ngdc-zxzxc-zxc' },
  { title: 'بررسی وضعیت حساب بانکی به وسیله کد ملی', subTitle: 'svc-abc-xztf-kfgv-pqlmn-jki' },
  { title: 'دریافت اطلاعات بیمه بر اساس شماره کارت ملی', subTitle: 'svc-lki-wqqr-nbdj-fvxtr-yuio' },
  { title: 'دریافت تاریخچه تراکنش‌های بانکی با شماره موبایل', subTitle: 'svc-xyz-lopf-zsed-qwert-tyu' },
  { title: 'ثبت نام در سامانه خدمات الکترونیکی با کد ملی', subTitle: 'svc-hjk-tyui-lkjh-vbmn-azsx' },
  { title: 'دریافت جزئیات حساب‌های بانکی از طریق شماره حساب', subTitle: 'svc-pqlm-kjbv-xcvb-sdfg-rtyu' },
  { title: 'استعلام وضعیت مالیاتی به وسیله شماره کارت ملی', subTitle: 'svc-mnbv-cxwr-qwer-jlkj-hgtr' },
  { title: 'دریافت اطلاعات وام‌ها بر اساس شماره ملی', subTitle: 'svc-jklo-pqrt-uytr-jkjl-hjkl' },
  { title: 'دریافت وضعیت املاک و مستغلات با کد ملی', subTitle: 'svc-xcvz-ytuf-ghjb-nbvc-plmj' },
];

const Api = {
  getClientService: async (params: params) => {
    return new Promise<{ data: ClientService[] }>((res) => {
      const data = mockData.filter((item) => item.title.includes(params.name));
      setTimeout(() => {
        res({ data });
      }, 1000);
    });
  },
};

export const useGetClientService = (params: params) => {
  return useQuery({
    enabled: !!params.name,
    queryKey: [RQKEYS.REUSABLE_COMPONENTS.CLIENT_SERVICES, params],
    queryFn: withErrorHandling(
      () => Api.getClientService(params),
      () => void 1
    ),
  });
};
