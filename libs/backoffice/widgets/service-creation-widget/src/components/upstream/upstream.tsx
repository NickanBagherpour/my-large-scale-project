import Box from '../box/box';
import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { GridCard } from '@oxygen/reusable-components';
import { ColumnsType, InfoBox, Loading, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import { UpstreamServer } from '@oxygen/types';
import Footer from '../footer/footer';
import { nextStep, previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';
import { useGetUpstreams, useGetUpstreamWithTargets } from '../../services';
import { useState } from 'react';
import { UpstreamWithTargets } from '../../types';
import { getValueOrDash } from '@oxygen/utils';

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { data: upstreams, isFetching: isFetchingUpstreams } = useGetUpstreams();
  const [selectedUpstreamId, setSelectedUpstreamId] = useState<number | null>(null);
  const { data: upstreamWithTargets, isFetching: isFetchingUpstreamWithTargets } =
    useGetUpstreamWithTargets(selectedUpstreamId);

  const isFetching = isFetchingUpstreams || isFetchingUpstreamWithTargets;

  const onReturn = () => {
    previousStep(dispatch);
  };

  const desktopColumns: ColumnsType<UpstreamWithTargets> = [
    {
      title: t('domain'),
      dataIndex: 'domain',
      align: 'center',
    },
    {
      title: t('health_status'),
      dataIndex: 'healthStatus',
      align: 'center',
      render: (upstream) => getValueOrDash(upstream?.healthStatus),
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
            <Table.MobileColumn minHeight={'40px'} title={t('health_status')} value={getValueOrDash(healthStatus)} />
            <Table.MobileColumn minHeight={'40px'} title={t('weight')} value={weight} />
          </UiKitBox>
        );
      },
    },
  ];

  return (
    <Container id='MY_CONTAINER_ASDF_1234'>
      <Loading spinning={isFetching} style={{ minHeight: '40rem' }}>
        {upstreams?.content && (
          <>
            <S.Title>{t('choose_upstream')}</S.Title>
            <Box>
              <S.Grid>
                {upstreams.content.map(({ name, id, activeServerCount }) => (
                  <GridCard
                    key={id}
                    title={name}
                    serversCount={activeServerCount}
                    hasSetting={false}
                    isSelected={id === selectedUpstreamId}
                    isHeaderLtr={true}
                    onClick={() => setSelectedUpstreamId(id)}
                  />
                ))}
              </S.Grid>
            </Box>
          </>
        )}
      </Loading>

      {upstreamWithTargets && (
        <Box>
          <InfoBox
            minColumnCount={2}
            margin={'0 0 2.8rem'}
            data={[
              { key: t('upstream_english_name'), value: upstreamWithTargets?.name },
              { key: t('upstream_description'), value: getValueOrDash(upstreamWithTargets?.description) },
            ]}
          />

          <S.Title>{t('upstream_servers')}</S.Title>

          <Table
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            dataSource={upstreamWithTargets?.targets}
            rowKey={(row) => row.idx}
            pagination={false}
          />
        </Box>
      )}

      {!isFetching && <Footer onRegister={() => nextStep(dispatch)} onReturn={onReturn} />}
    </Container>
  );
}
