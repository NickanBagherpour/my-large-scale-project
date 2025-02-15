import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { BorderedSection, CenteredLoading, Footer, GridCard, NoResult } from '@oxygen/reusable-components';
import { ColumnsType, InfoBox, Loading, Pagination, Table } from '@oxygen/ui-kit';
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

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [{ searchTerm, page }, setQuery] = useState({ page: 1, searchTerm: '' });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useBounce(() => {
    setDebouncedSearchTerm(searchTerm.trim());
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
        const data = [
          { title: t('domain'), value: domain },
          { title: t('health_status'), value: getValueOrDash(healthStatus) },
          { title: t('weight'), value: weight },
        ];

        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
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
        <BorderedSection>
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
        </BorderedSection>
      </Loading>

      {upstream && !!upstreams?.totalElements && (
        <BorderedSection>
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
            rowKey={(row) => row.id}
            pagination={false}
          />
        </BorderedSection>
      )}

      {!isFetching && (
        <Footer registerButtonProps={{ disabled: !selectedUpstreamName }} onRegister={onRegister} onReturn={onReturn} />
      )}
    </Container>
  );
}
