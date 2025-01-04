import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Modal } from '@oxygen/ui-kit';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  data: any;
  loading: boolean;
};

export default function DetailsModal(props: Props) {
  const { isOpen, toggle, data, loading } = props;
  const [t] = useTr();

  const infoBoxData = [
    { key: t('modal.english_name'), value: data?.serviceLatinName ?? '-' },
    { key: t('modal.persian_name'), value: data?.servicePersianName ?? '-' },
    { key: t('modal.action'), value: data?.action ?? '-' },
    { key: t('modal.protocole'), value: data?.routeProtocol ?? '-' },
    { key: t('modal.access'), value: data?.routeHosts ?? '-' },
    { key: t('modal.category'), value: data?.routeHosts ?? '-' },
    { key: t('modal.throughput'), value: data?.routeHosts ?? '-' },
    { key: t('modal.version'), value: data?.serviceVersion ?? '-' },
    { key: t('modal.owner'), value: data?.ownerName ?? '-' },
    { key: t('modal.tag'), value: data?.routeHosts ?? '-' },
    { key: t('modal.path'), value: data?.routePath ?? '-' },
    { key: t('modal.host'), value: data?.routeHosts ?? '-' },
    { key: t('modal.upstream'), value: data?.upstreamTitle ?? '-' },
    { key: t('modal.service_definition_status'), value: data?.routeHosts ?? '-' },
  ];

  return (
    <Modal
      centered
      title={t('modal.service_detail')}
      open={isOpen}
      onCancel={toggle}
      width={1000}
      footer={[
        <Button size='large' color='primary' variant='outlined' onClick={toggle}>
          {t('register_data')}
        </Button>,
      ]}
    >
      <InfoBox margin={0} data={infoBoxData} loading={loading} />
    </Modal>
  );
}
