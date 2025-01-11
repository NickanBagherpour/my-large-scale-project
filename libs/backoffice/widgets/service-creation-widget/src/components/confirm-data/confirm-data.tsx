import { useTr } from '@oxygen/translation';
import * as S from './confirm-data.style';
import { Chip, ColumnsType, InfoBox, Table, Box as UiKitBox } from '@oxygen/ui-kit';
import type { InfoItemType } from '@oxygen/types';
import Footer from '../footer/footer';
import { previousStep, useAppDispatch } from '../../context';
import { Container } from '../container/container.style';
import { useToggle } from '@oxygen/hooks';
import { useGetServiceScope, useGetService, useGetUpstream, usePostConfirmData } from '../../services';
import { useGetRoute } from '../../services/get-route.api';
import { getValueOrDash } from '@oxygen/utils';
import { UpstreamTarget } from '../../types';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { StatusModal } from '@oxygen/reusable-components';

const mapStatuses = {
  success: 'success',
  pending: 'loading',
  idle: 'loading',
  error: 'error',
} as const;

export default function ConfirmData() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [isResultModalOpen, toggleIsResultModalOpen] = useToggle(false);
  const { data: service, isFetching: isFetchingService } = useGetService();
  const { data: route, isFetching: isFetchingRoute } = useGetRoute();
  const { data: scope, isFetching: isFetchingScope } = useGetServiceScope();
  const { data: upstream, isFetching: isFetchingUpstream } = useGetUpstream();
  const { mutate: confirmData, status } = usePostConfirmData();

  let generalInfoData: InfoItemType[] = [];
  if (service) {
    const { name, persianName, accessLevel, category, throughput, version, owner, tags } = service;
    generalInfoData = [
      { key: 'english_name', value: name },
      { key: 'persian_name', value: persianName },
      { key: 'access', value: getValueOrDash(accessLevel?.title) },
      { key: 'category', value: getValueOrDash(category?.title) },
      { key: 'Throughout', value: getValueOrDash(throughput?.title) },
      { key: 'version', value: getValueOrDash(version) },
      { key: 'owner', value: getValueOrDash(owner) },
      {
        key: 'tag',
        fullwidth: true,
        value: tags.length ? (
          <S.Chips>
            {tags.map(({ id, title }) => (
              <Chip ellipsis type='active' key={id} tooltipOnEllipsis tooltipTitle={title}>
                {title}
              </Chip>
            ))}
          </S.Chips>
        ) : (
          '-'
        ),
      },
    ];
  }

  let scopeData: InfoItemType[] = [];
  if (scope) {
    const { description, name } = scope;
    scopeData = [
      { key: 'english_name', value: name },
      { key: 'persian_name', value: getValueOrDash(description) },
    ];
  }

  let upstreamData: InfoItemType[] = [];
  let upstreamTargets: UpstreamTarget[] = [];

  if (upstream) {
    const { description, name, targets } = upstream;
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
  if (route) {
    const { host, path, method, protocol } = route;
    routeData = [
      { key: 'action_or_method', value: getValueOrDash(method?.title) },
      { key: 'protocol', value: getValueOrDash(protocol?.title) },
      { key: 'Path', value: path },
      { key: 'host', value: host },
    ];
  }

  const desktopColumns: ColumnsType<UpstreamTarget> = [
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

  const mobileColumns: ColumnsType<UpstreamTarget> = [
    {
      key: 'mobileColumn',
      render: ({ domain, healthStatus, weight }: UpstreamTarget) => {
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

  const onReturn = () => previousStep(dispatch);

  const onRegister = () => {
    confirmData();
    toggleIsResultModalOpen();
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
        <Footer onRegister={onRegister} onReturn={onReturn} />
      </Container>
      <StatusModal
        isOpen={isResultModalOpen}
        status={mapStatuses[status]}
        loadingProps={{
          description: t('we_are_processing_please_wait'),
          footer: (
            <Button icon={<i className='icon-home-empty' />} variant='outlined' color='primary' disabled>
              {t('service_managment')}
            </Button>
          ),
        }}
        successProps={{
          description: t('register_request_was_submitted'),
          footer: (
            <Button variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              <i className='icon-home-empty' />
              {t('service_managment')}
            </Button>
          ),
        }}
        errorProps={{
          description: t('date_wasnt_registered'),
          footer: [
            <Button icon={<i className='icon-home-empty' />} href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              {t('service_managment')}
            </Button>,
            <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              {t('save_in_draft')}
            </Button>,
          ],
        }}
      />
    </>
  );
}
