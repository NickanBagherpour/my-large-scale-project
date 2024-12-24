import Box from '../box/box';
import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { GridCard } from '@oxygen/reusable-components';
import { ColumnsType, InfoBox, Loading, Pagination, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import { UpstreamServer } from '@oxygen/types';
import Footer from '../footer/footer';
import { nextStep, previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';
import {
  useGetUpstream,
  useGetUpstreams,
  useGetUpstreamWithTargets,
  usePostAssignUpstreamToService,
} from '../../services';
import { ChangeEvent, useState } from 'react';
import { UpstreamWithTargets } from '../../types';
import { getValueOrDash } from '@oxygen/utils';
import { useSearchParams } from 'next/navigation';
import { useDebouncedValue } from '@oxygen/hooks';
import { UPSTREAMS_PAGE_SIZE } from '../../utils/consts';

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState({ page: 1, searchTerm: '' });
  const { page, searchTerm } = query;
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const { data: upstreams, isFetching: isFetchingUpstreams } = useGetUpstreams({
    page: debouncedQuery.page - 1, // backend pages starts from zero
    size: UPSTREAMS_PAGE_SIZE,
    sort: '',
    'search-field': debouncedQuery.searchTerm,
  });
  const [selectedUpstreamId, setSelectedUpstreamId] = useState<number | null>(null);
  const { data: currentUpstream, isFetching: isFetchingCurrentUpstream, is404Error } = useGetUpstream();
  const { data: upstreamWithTargets, isFetching: isFetchingUpstreamWithTargets } =
    useGetUpstreamWithTargets(selectedUpstreamId);
  const { mutateAsync: assignUpstreamToService } = usePostAssignUpstreamToService();
  const serviceName = useSearchParams().get('service-name');

  const isFetching = isFetchingUpstreams || isFetchingUpstreamWithTargets || isFetchingCurrentUpstream;
  const upstream = upstreamWithTargets || currentUpstream?.data;

  const onReturn = () => {
    previousStep(dispatch);
  };

  const onRegister = async () => {
    try {
      if (!selectedUpstreamId || !serviceName) return;
      await assignUpstreamToService({ id: selectedUpstreamId, serviceName });
      nextStep(dispatch);
    } catch {
      //
    }
  };

  const changePage = (currentPage: number) => {
    if (currentPage) {
      setQuery((prev) => ({ ...prev, page: currentPage }));
    }
  };

  const changeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery({ page: 1, searchTerm: e.target.value });
    setSelectedUpstreamId(null);
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
    <Container>
      <Loading spinning={isFetching} style={{ minHeight: '40rem' }}>
        {upstreams?.content && (
          <>
            <S.Title>{t('choose_upstream')}</S.Title>
            <Box>
              <S.Input
                value={searchTerm}
                placeholder={t('search_by_english_or_persian_name')}
                prefix={<i className='icon-search-normal' />}
                onChange={changeSearchTerm}
              />

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
                    status={activeServerCount ? 'active' : 'inactive'}
                  />
                ))}
              </S.Grid>

              <Pagination
                current={page}
                total={upstreams.totalElements}
                pageSize={UPSTREAMS_PAGE_SIZE}
                showSizeChanger={false}
                align='center'
                onChange={changePage}
              />
            </Box>
          </>
        )}
      </Loading>

      {upstream && (
        <Box>
          <InfoBox
            minColumnCount={2}
            margin={'0 0 2.8rem'}
            data={[
              { key: t('upstream_english_name'), value: upstream?.name },
              { key: t('upstream_description'), value: getValueOrDash(upstream?.description) },
            ]}
          />

          <S.Title>{t('upstream_servers')}</S.Title>

          <Table
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            dataSource={upstream?.targets}
            rowKey={(row) => row.idx}
            pagination={false}
          />
        </Box>
      )}

      {!isFetching && <Footer onRegister={onRegister} onReturn={onReturn} />}
    </Container>
  );
}
