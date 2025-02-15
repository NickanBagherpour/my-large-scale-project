import { useTr } from '@oxygen/translation';
import { Button, Chip, ColumnsType, InfoBox, Loading, Modal, Table, type InfoBoxProps } from '@oxygen/ui-kit';
import { useGetServiceDetails } from '../utils/get-service-details.api';
import { getValueOrDash } from '@oxygen/utils';
import { type Dispatch } from 'react';
import * as S from './details-modal.style';
import { ServiceDetails } from '../utils/services.type';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
  dispatch: Dispatch<any>;
};

type Scope = ServiceDetails['scopes'][number];

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName, dispatch } = props;
  const [t] = useTr();
  const { data: service, isFetching } = useGetServiceDetails(serviceName, dispatch);

  let generalData: InfoBoxProps['data'] = [];
  let route: InfoBoxProps['data'] = [];
  if (service) {
    const {
      throughput,
      tags,
      routes,
      ownerName,
      serviceVersion,
      serviceLatinName,
      authenticationType,
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
      { key: t('uikit.access'), value: authenticationType.title },
      { key: t('uikit.category'), value: getValueOrDash(serviceCategoryTitle) },
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
        key: t('field.method'),
        value:
          flatRoutes.methods.map((tag) => (
            <Chip key={tag} type='active'>
              {tag}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },

      {
        key: t('field.protocol'),
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

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('common.index'),
      align: 'center',
      dataIndex: 'id',
      width: '1rem',
      render: (_val: number, _record: ServiceDetails['scopes'][number], index: number) => index + 1,
    },
    {
      title: t('common.english_name'),
      align: 'center',
      dataIndex: 'name',
      render: (name: string) => name,
    },
    {
      title: t('common.persian_name'),
      align: 'center',
      dataIndex: 'description',
      render: (description: string) => description,
    },
  ] as const;

  const mobileColumns = [
    {
      title: '',
      key: 'id',
      render: ({ name, description }) => {
        const data = [
          { title: t('common.english_name'), value: getValueOrDash(name) },
          { title: t('common.persian_name'), value: getValueOrDash(description) },
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
        <Button key='close' size='large' color='primary' variant='outlined' onClick={close}>
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
              rowKey={(row) => row.id}
            />
          </div>
        </S.Container>
      )}
    </Modal>
  );
}
