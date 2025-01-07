import Box from '../box/box';
import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { GridCard, NoResult } from '@oxygen/reusable-components';
import { ColumnsType, InfoBox, Loading, Pagination, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { nextStep, previousStep, useAppDispatch, useAppState } from '../../context';
import { Container } from '../container/container.style';
import {
  useGetUpstream,
  useGetUpstreams,
  useGetUpstreamWithTargets,
  usePostAssignUpstreamToService,
} from '../../services';
import { ChangeEvent, useEffect, useState } from 'react';
import { UpstreamTarget, UpstreamWithTargets } from '../../types';
import { getValueOrDash } from '@oxygen/utils';
import { useBounce } from '@oxygen/hooks';
import { UPSTREAMS_PAGE_SIZE } from '../../utils/consts';
import CenteredLoading from '../centered-loading/centered-loading';

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [{ searchTerm, page }, setQuery] = useState({ page: 1, searchTerm: '' });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useBounce(() => {
    setDebouncedSearchTerm(searchTerm);
    setQuery((prev) => ({ ...prev, page: 1 }));
  }, [searchTerm]);
  const {
    data: upstreams,
    isFetching: isFetchingUpstreams,
    isLoading: isLoadingUpstreams,
  } = useGetUpstreams({
    page: page - 1, // backend pages starts from zero
    size: UPSTREAMS_PAGE_SIZE,
    sort: '',
    'search-field': debouncedSearchTerm,
  });
  const [selectedUpstreamName, setSelectedUpstreamName] = useState<string | null>(null);
  const { data: currentUpstream, isFetching: isFetchingCurrentUpstream } = useGetUpstream();
  const { data: upstreamWithTargets, isFetching: isFetchingUpstreamWithTargets } =
    useGetUpstreamWithTargets(selectedUpstreamName);
  const { mutate: assignUpstreamToService } = usePostAssignUpstreamToService();
  const { serviceName } = useAppState();

  const isFetching = isFetchingUpstreams || isFetchingUpstreamWithTargets || isFetchingCurrentUpstream;
  const upstream = upstreamWithTargets || currentUpstream;

  useEffect(() => {
    if (currentUpstream) {
      setSelectedUpstreamName(currentUpstream.name);
    }
  }, [currentUpstream]);

  const onReturn = () => {
    previousStep(dispatch);
  };

  const onRegister = () => {
    if (!selectedUpstreamName || !serviceName) return;
    assignUpstreamToService(
      { upstreamName: selectedUpstreamName, serviceName },
      { onSuccess: () => nextStep(dispatch) }
    );
  };

  const changePage = (currentPage: number) => {
    if (currentPage) {
      setQuery((prev) => ({ ...prev, page: currentPage }));
    }
  };

  const changeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, searchTerm: e.target.value }));
    setSelectedUpstreamName(null);
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

  const mobileColumns: ColumnsType<UpstreamTarget> = [
    {
      title: null,
      key: 'mobileColumn',
      render: ({ domain, healthStatus, weight }: UpstreamTarget) => {
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

  if (isLoadingUpstreams) {
    return <CenteredLoading />;
  }

  return (
    <Container>
      <Loading spinning={isFetching}>
        <S.Title>{t('choose_upstream')}</S.Title>
        <Box>
          <S.Input
            value={searchTerm}
            placeholder={t('search_by_english_or_persian_name')}
            prefix={<i className='icon-search-normal' />}
            onChange={changeSearchTerm}
          />

          {upstreams?.totalElements ? (
            <>
              <S.Grid>
                {upstreams.content.map(({ name, id, activeServerCount }) => (
                  <GridCard
                    key={id}
                    title={name}
                    serversCount={activeServerCount}
                    hasSetting={false}
                    isSelected={name === selectedUpstreamName}
                    isHeaderLtr={true}
                    onClick={() => setSelectedUpstreamName(name)}
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
            </>
          ) : (
            <NoResult isLoading={isFetchingUpstreams} />
          )}
        </Box>
      </Loading>

      {upstream && !!upstreams?.totalElements && (
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

      {!isFetching && (
        <Footer registerButtonProps={{ disabled: !selectedUpstreamName }} onRegister={onRegister} onReturn={onReturn} />
      )}
    </Container>
  );
}
