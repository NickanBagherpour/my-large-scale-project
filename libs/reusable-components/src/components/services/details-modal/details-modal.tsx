import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Loading, Modal } from '@oxygen/ui-kit';
import { useGetServiceDetails } from '../utils/get-service-details.api';
import { getValueOrDash } from '@oxygen/utils';
import { type Dispatch } from 'react';

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

  let data: Array<{ key: string; value: string }> = [];
  if (service) {
    const {
      throughput,
      scopes,
      tags,
      routes,
      ownerName,
      upstreamTitle,
      serviceVersion,
      serviceenglishName,
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

    data = [
      { key: t('uikit.english_name'), value: serviceenglishName },
      { key: t('uikit.persian_name'), value: servicePersianName },
      { key: t('uikit.action'), value: flatRoutes.methods.join(' ,') },
      { key: t('uikit.protocole'), value: flatRoutes.protocol.join(' ,') },
      { key: t('uikit.access'), value: authenticationType.title },
      { key: t('uikit.category'), value: serviceCategoryTitle },
      { key: t('uikit.throughout'), value: throughput.title },
      { key: t('uikit.version'), value: serviceVersion },
      { key: t('uikit.owner'), value: ownerName },
      { key: t('uikit.tag'), value: tags.map((tag) => tag.title).join(' ,') },
      { key: t('uikit.path'), value: flatRoutes.paths.join(' ,') },
      { key: t('uikit.host'), value: flatRoutes.hosts.join(' ,') },
      { key: t('uikit.upstream'), value: upstreamTitle },
      { key: t('uikit.scope'), value: scopes.map((scope) => scope.name).join(' ,') },
      { key: t('uikit.descriptions'), value: getValueOrDash(serviceDescription) },
    ];
  }

  return (
    <Modal
      centered
      title={t('uikit.service_detail')}
      open={isOpen}
      onCancel={close}
      width={1000}
      footer={[
        <Button size='large' color='primary' variant='outlined' onClick={close}>
          {t('common.close')}
        </Button>,
      ]}
    >
      {isFetching ? <Loading /> : <InfoBox margin={0} data={data} />}
    </Modal>
  );
}
