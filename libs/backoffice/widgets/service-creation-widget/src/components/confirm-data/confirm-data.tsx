import { useTr } from '@oxygen/translation';
import * as S from './confirm-data.style';
import { Chip, ColumnsType, InfoBox, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import type { InfoItemType, UpstreamServer } from '@oxygen/types';
import Footer from '../footer/footer';
import { previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';
import { useToggle } from '@oxygen/hooks';
import ResultModal from '../result-modal/result-modal';
import { useGetScope, useGetService, useGetUpstream } from '../../services';
import { useGetRoute } from '../../services/get-route.api';
import { getValueOrDash } from '@oxygen/utils';

export default function ConfirmData() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [isResultModalOpen, toggleIsResultModalOpen] = useToggle(false);
  const { data: service, isFetching: isFetchingService } = useGetService();
  const { data: route, isFetching: isFetchingRoute } = useGetRoute();
  const { data: scope, isFetching: isFetchingScope } = useGetScope();
  const { data: upstream, isFetching: isFetchingUpstream } = useGetUpstream();

  let generalInfoData: InfoItemType[] = [];
  if (service?.data) {
    const { name, persianName, accessLevel, category, throughput, version, owner, tags } = service.data;
    generalInfoData = [
      { key: 'english_name', value: name },
      { key: 'persian_name', value: persianName },
      { key: 'access', value: accessLevel.title },
      { key: 'category', value: category.title },
      { key: 'Throughout', value: throughput.title },
      { key: 'version', value: version },
      { key: 'owner', value: owner },
      {
        key: 'tag',
        fullwidth: true,
        value: getValueOrDash(
          tags.map(({ id, title }) => (
            <Chip ellipsis closeIcon type='active' key={id} tooltipOnEllipsis tooltipTitle={title}>
              {title}
            </Chip>
          ))
        ),
      },
    ];
  }

  let scopeData: InfoItemType[] = [];
  if (scope?.data) {
    const { description, name } = scope.data;
    scopeData = [
      { key: 'english_name', value: name },
      { key: 'persian_name', value: getValueOrDash(description) },
    ];
  }

  let upstreamData: InfoItemType[] = [];
  let upstreamTargets: UpstreamServer[] = [];

  if (upstream?.data) {
    const { description, name, targets } = upstream.data;
    upstreamData = [
      { key: 'english_name', value: name },
      { key: 'description', value: getValueOrDash(description) },
    ];

    upstreamTargets = targets.map(({ weight, domain }, idx) => ({
      idx,
      weight,
      domain,
      healthStatus: getValueOrDash(null),
    }));
  }

  let routeData: InfoItemType[] = [];
  if (route?.data) {
    const { host, path, method, protocol } = route.data;
    routeData = [
      { key: 'action_or_method', value: method },
      { key: 'protocol', value: protocol },
      { key: 'Path', value: path },
      { key: 'host', value: host },
    ];
  }

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

  const onReturn = () => {
    previousStep(dispatch);
  };

  return (
    <>
      <Container>
        <div>
          <S.Section>
            <S.Title>{t('service_general_info')}</S.Title>
            <InfoBox loading={isFetchingService} data={generalInfoData} margin={0} />
          </S.Section>

          <S.Section>
            <S.Title>{t('route')}</S.Title>
            <InfoBox loading={isFetchingRoute} data={routeData} margin={0} minColumnCount={2} />
          </S.Section>

          <S.Section>
            <S.Title>{t('scope')}</S.Title>
            <InfoBox loading={isFetchingScope} data={scopeData} margin={0} minColumnCount={2} />
          </S.Section>

          <S.Section>
            <S.Title>{t('upstream')}</S.Title>
            <InfoBox loading={isFetchingUpstream} data={upstreamData} margin={'0 0 1.6rem 0'} minColumnCount={2} />
            <Table
              loading={isFetchingUpstream}
              dataSource={upstreamTargets}
              pagination={false}
              columns={desktopColumns}
              rowKey={(row) => row.idx}
              mobileColumns={mobileColumns}
            />
          </S.Section>
        </div>
        <Footer onRegister={toggleIsResultModalOpen} onReturn={onReturn} />
      </Container>

      <ResultModal isOpen={isResultModalOpen} toggle={toggleIsResultModalOpen} />
    </>
  );
}
