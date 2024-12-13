import { useTr } from '@oxygen/translation';
import * as S from './confirm-data.style';
import { ColumnsType, InfoBox, Table } from '@oxygen/ui-kit';
import { UpstreamServer } from '@oxygen/types';
import Footer from '../footer/footer';
import { previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';

export default function ConfirmData() {
  const [t] = useTr();
  const dispatch = useAppDispatch();

  const generalInfoData = [
    { key: 'english_name', value: 'ٰsvc-gfg-bhhj-ngdc-zxzxc-zxc' },
    { key: 'persian_name', value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
    { key: 'access', value: 'ٰPUBLIC' },
    { key: 'category', value: 'ACCOUNT' },
    { key: 'Throughout', value: 'Unlimited' },
    { key: 'version', value: 'v1' },
    { key: 'owner', value: 'Sadad' },
    { key: 'tag', value: 'CUSTOMER' },
  ];

  const scopeData = [
    { key: 'english_name', value: 'ٰsvc-gfg-bhhj-ngdc-zxzxc-zxc' },
    { key: 'persian_name', value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
  ];

  const upstreamData = [
    { key: 'english_name', value: 'SEJAM-UPSTREAM' },
    { key: 'description', value: 'آپ‌استریم سجام' },
  ];

  const routeData = [
    { key: 'action_or_method', value: 'Post' },
    { key: 'protocole', value: 'HTTP' },
    { key: 'Path', value: 'api/sapta/v1/bale/customer-info/' },
    { key: 'host', value: 'Openapis.bmi.ir' },
  ];

  const data: UpstreamServer[] = Array.from({ length: 4 }).map((_, idx) => ({
    idx,
    weight: '100',
    domain: '192.168.1.20',
    healthStatus: 'سالم',
  }));

  const desktopColumns: ColumnsType<UpstreamServer> = [
    {
      title: t('domain'),
      dataIndex: 'domain',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('health_status'),
      dataIndex: 'healthStatus',
      align: 'center',
    },
    {
      title: t('weight'),
      dataIndex: 'weight',
      align: 'center',
    },
  ];

  const onReturn = () => {
    previousStep(dispatch);
  };

  return (
    <Container>
      <S.Section>
        <S.Title>{t('service_general_info')}</S.Title>
        <InfoBox data={generalInfoData} margin={0} />
      </S.Section>

      <S.Section>
        <S.Title>{t('scope')}</S.Title>
        <InfoBox data={scopeData} margin={0} minColumnCount={2} />
      </S.Section>

      <S.Section>
        <S.Title>{t('upstream')}</S.Title>
        <InfoBox data={upstreamData} margin={'0 0 1.6rem 0'} minColumnCount={2} />
        <Table columns={desktopColumns} dataSource={data} rowKey={(row) => row.idx} pagination={false} />
      </S.Section>

      <S.Section>
        <S.Title>{t('route')}</S.Title>
        <InfoBox data={routeData} margin={0} minColumnCount={2} />
      </S.Section>

      <Footer onRegister={() => void 1} onReturn={onReturn} />
    </Container>
  );
}
