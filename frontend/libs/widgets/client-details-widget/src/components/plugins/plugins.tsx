import Service from '../service/service';
import Header from '../plugin-header/plugin-header';

const data = {
  name: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
  englishName: 'Customer-idnumber-phonenumber',
  status: 'تایید‌ شده',
  version: 'V2.0',
  scope: 'svc-mgmt-samat-lc-bal-del',
  upstream: 'sejam',
};

export default function Plugins() {
  return (
    <section>
      <Header />
      {Array.from({ length: 4 }).map((_, idx) => (
        <Service key={idx} idx={idx + 1} {...data} />
      ))}
    </section>
  );
}
