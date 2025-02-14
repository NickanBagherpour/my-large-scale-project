import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Loading, Modal, Table } from '@oxygen/ui-kit';
import { useGetServiceDetails } from '../utils/get-service-details.api';
import { getValueOrDash } from '@oxygen/utils';
import { type ReactNode, type Dispatch } from 'react';
import * as S from './details-modal.style';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
  dispatch: Dispatch<any>;
};

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName, dispatch } = props;
  const [t] = useTr();
  const { data: service, isFetching } = useGetServiceDetails(serviceName, dispatch);

  let generalData: Array<{ key: string; value: ReactNode }> = [];
  let route: Array<{ key: string; value: ReactNode }> = [];
  if (service) {
    const {
      throughput,
      scopes,
      tags,
      routes,
      ownerName,
      upstreamTitle,
      serviceVersion,
      serviceLatinName,
      authenticationType,
      serviceDescription,
      servicePersianName,
      serviceCategoryTitle,
    } = service;

    const flatRoutes = {
      methods: [] as string[],
      protocol: [] as string[],
      hosts: [] as string[],
      paths: [] as string[],
    };

    routes.forEach((route) => {
      flatRoutes.methods.push(...route.routeMethod);
      flatRoutes.protocol.push(...route.routeProtocol);
      flatRoutes.hosts.push(...route.routeHosts);
      flatRoutes.paths.push(...route.routePath);
    });

    generalData = [
      { key: t('common.english_name'), value: serviceLatinName },
      { key: t('common.persian_name'), value: servicePersianName },
      // { key: t('uikit.action'), value: flatRoutes.methods.join(' ,') },
      // { key: t('uikit.protocole'), value: flatRoutes.protocol.join(' ,') },
      { key: t('uikit.access'), value: authenticationType.title },
      { key: t('uikit.category'), value: serviceCategoryTitle },
      { key: t('uikit.throughout'), value: throughput.title },
      { key: t('uikit.version'), value: serviceVersion },
      { key: t('uikit.owner'), value: ownerName },

      {
        key: t('uikit.tag'),
        value:
          tags.map((tag) => (
            <Chip key={tag.id} type='active'>
              {tag.title}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },

      // { key: t('uikit.path'), value: flatRoutes.paths.join(' ,') },
      // { key: t('uikit.host'), value: flatRoutes.hosts.join(' ,') },

      // { key: t('uikit.upstream'), value: upstreamTitle },

      // { key: t('uikit.scope'), value: scopes.map((scope) => scope.name).join(' ,') },
      // { key: t('uikit.descriptions'), value: getValueOrDash(serviceDescription) },
    ];

    route = [
      {
        key: t('uikit.path'),
        value:
          flatRoutes.paths.map((tag) => (
            <Chip key={tag} type='active'>
              {tag}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },

      {
        key: t('uikit.host'),
        value:
          flatRoutes.hosts.map((tag) => (
            <Chip key={tag} type='active'>
              {tag}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },

      {
        key: t('uikit.methods'),
        value:
          flatRoutes.methods.map((tag) => (
            <Chip key={tag} type='active'>
              {tag}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },

      {
        key: t('uikit.protocols'),
        value:
          flatRoutes.protocol.map((tag) => (
            <Chip key={tag} type='active'>
              {tag}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },
    ];
  }

  const desktopColumns = [
    {
      title: t('common.index'),
      align: 'center',
      key: 'id',
      width: '1rem',
      render: (_val, _record, index) => {
        return index + 1;
      },
    },
    {
      title: t('common.english_name'),
      align: 'center',
      key: 'ssoScopeId',
      render: (value) => {
        return value?.name;
      },
    },
    {
      title: t('common.persian_name'),
      align: 'center',
      key: 'description',
      render: (value) => {
        return value?.description;
      },
    },
  ];

  const mobileColumns = [
    {
      title: '',
      key: 'id',
      render: ({ name, description }) => {
        const data = [
          { title: t('common.english_name'), value: getValueOrDash(name) },
          {
            title: t('common.persian_name'),
            value: getValueOrDash(description),
          },
        ];

        return <Table.MobileColumns columns={data} />;
      },
    },
  ];

  return (
    <Modal
      centered
      title={t('uikit.service_detail')}
      open={isOpen}
      onCancel={close}
      width={1000}
      headerDivider
      footer={[
        <Button size='large' color='primary' variant='outlined' onClick={close}>
          {t('common.close')}
        </Button>,
      ]}
    >
      {isFetching ? (
        <Loading />
      ) : (
        <S.Container>
          <div>
            <S.Title>{t('uikit.general_info')}</S.Title>
            <InfoBox margin={0} data={generalData} />
          </div>

          <div>
            <S.Title>{t('element.route')}</S.Title>
            <InfoBox margin={0} data={route} />
          </div>

          <div>
            <S.Title>{t('element.scope')}</S.Title>
            <Table
              loading={isFetching}
              total={service?.scopes.length}
              dataSource={service?.scopes}
              pagination={false}
              columns={desktopColumns}
              mobileColumns={mobileColumns}
              rowKey={(row) => row.index}
            />
          </div>
        </S.Container>
      )}
    </Modal>
  );
}
