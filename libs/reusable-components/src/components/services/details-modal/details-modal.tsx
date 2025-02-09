import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Loading, Modal } from '@oxygen/ui-kit';
import { useGetServiceDetails } from '../utils/get-service-details.api';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
};

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName } = props;
  const [t] = useTr();
  const { data: service, isFetching } = useGetServiceDetails(serviceName);

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

    data = [
      { key: t('english_name'), value: serviceLatinName },
      { key: t('persian_name'), value: servicePersianName },
      { key: t('action'), value: flatRoutes.methods.join(' ,') },
      { key: t('protocole'), value: flatRoutes.protocol.join(' ,') },
      { key: t('access'), value: authenticationType.title },
      { key: t('category'), value: serviceCategoryTitle },
      { key: t('throughout'), value: throughput.title },
      { key: t('version'), value: serviceVersion },
      { key: t('owner'), value: ownerName },
      { key: t('tag'), value: tags.map((tag) => tag.title).join(' ,') },
      { key: t('path'), value: flatRoutes.paths.join(' ,') },
      { key: t('host'), value: flatRoutes.hosts.join(' ,') },
      { key: t('upstream_details'), value: upstreamTitle },
      { key: t('scope'), value: scopes.map((scope) => scope.name).join(' ,') },
      { key: t('descriptions'), value: getValueOrDash(serviceDescription) },
    ];
  }

  return (
    <Modal
      centered
      title={t('service_detail')}
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
