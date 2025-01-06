import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Modal } from '@oxygen/ui-kit';

import { useModalInfoQuery } from '../../../../services/second-tab/get-modal-data.api';
import { Nullable } from '@oxygen/types';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  name: Nullable<string>;
};

export default function DetailsModal(props: Props) {
  //Hooks
  const { isOpen, toggle, name } = props;
  const [t] = useTr();
  //Query
  const { data: modalDataQuery, isFetching: modalIsFetching } = useModalInfoQuery(name);
  //Constats
  const tags = modalDataQuery?.tags ? modalDataQuery?.tags.map((tag) => tag.title).join(', ') : [];
  const infoBoxData = [
    { key: t('modal.english_name'), value: modalDataQuery?.serviceLatinName ?? '-' },
    { key: t('modal.persian_name'), value: modalDataQuery?.servicePersianName ?? '-' },
    { key: t('modal.action'), value: modalDataQuery?.routeMethod ?? '-' },
    { key: t('modal.protocole'), value: modalDataQuery?.routeProtocol ?? '-' },
    { key: t('modal.access'), value: modalDataQuery?.authenticationType?.title ?? '-' },
    { key: t('modal.category'), value: modalDataQuery?.serviceCategoryTitle ?? '-' },
    { key: t('modal.throughput'), value: modalDataQuery?.throughput?.title ?? '-' },
    { key: t('modal.version'), value: modalDataQuery?.serviceVersion ?? '-' },
    { key: t('modal.owner'), value: modalDataQuery?.ownerName ?? '-' },
    { key: t('modal.tag'), value: tags?.length ? tags : '-' },
    { key: t('modal.path'), value: modalDataQuery?.routePath ?? '-' },
    { key: t('modal.host'), value: modalDataQuery?.routeHosts ?? '-' },
    { key: t('modal.upstream'), value: modalDataQuery?.upstreamTitle ?? '-' },
    { key: t('modal.service_definition_status'), value: 'its not ready' },
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
      <InfoBox margin={0} data={infoBoxData} loading={modalIsFetching} />
    </Modal>
  );
}
