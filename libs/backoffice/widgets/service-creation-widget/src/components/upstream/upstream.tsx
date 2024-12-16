import Box from '../box/box';
import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { GridCard } from '@oxygen/reusable-components';
import { ColumnsType, InfoBox, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import { UpstreamServer } from '@oxygen/types';
import Footer from '../footer/footer';
import { nextStep, previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();

  const onReturn = () => {
    previousStep(dispatch);
  };

  const desktopColumns: ColumnsType<UpstreamServer> = [
    {
      title: t('domain'),
      dataIndex: 'domain',
      align: 'center',
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

  const mobileColumns: ColumnsType<UpstreamServer> = [
    {
      title: null,
      key: 'mobileColumn',
      render: ({ domain, healthStatus, weight }: UpstreamServer) => {
        return (
          <UiKitBox flexDirection='column'>
            <Table.MobileColumn minHeight={'40px'} title={t('domain')} value={domain} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'40px'} title={t('health_status')} value={healthStatus} />
            <Table.MobileColumn minHeight={'40px'} title={t('weight')} value={weight} />
          </UiKitBox>
        );
      },
    },
  ];

  const data: UpstreamServer[] = Array.from({ length: 4 }).map((_, idx) => ({
    idx,
    weight: '100',
    domain: '192.168.1.20',
    healthStatus: 'سالم',
  }));

  return (
    <Container>
      <Box>
        <S.Grid>
          {Array.from({ length: 10 }).map((_, idx) => (
            <GridCard
              key={idx}
              title={'API-SERVICES-UPSTREAM'}
              serversCount={5}
              hasSetting={false}
              isSelected={false}
              isHeaderLtr={true}
            />
          ))}
        </S.Grid>
      </Box>

      <Box>
        <InfoBox
          minColumnCount={2}
          margin={0}
          data={[
            { key: t('upstream_english_name'), value: 'SEJAM-UPSTREAM' },
            { key: t('upstream_description'), value: 'آپ‌استریم سجام' },
          ]}
        />

        <S.Title>{t('upstream_servers')}</S.Title>

        <Table
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          dataSource={data}
          rowKey={(row) => row.idx}
          pagination={false}
        />
      </Box>

      <Footer onRegister={() => nextStep(dispatch)} onReturn={onReturn} />
    </Container>
  );
}
