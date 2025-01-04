import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Modal } from '@oxygen/ui-kit';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function DetailsModal(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();

  const data = [
    { key: t('modal.english_name'), value: 'svc-gfg-bhhj-ngdc-zxzxc-zxc' },
    { key: t('modal.persian_name'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
    { key: t('modal.action'), value: 'Post' },
    { key: t('modal.protocole'), value: 'HTTP' },
    { key: t('modal.access'), value: 'PUBLIC' },
    { key: t('modal.category'), value: 'ACCOUNT' },
    { key: t('modal.throughput'), value: 'Throughout' },
    { key: t('modal.version'), value: 'V1' },
    { key: t('modal.owner'), value: 'Sadad' },
    { key: t('modal.tag'), value: 'CUSOTMER' },
    { key: t('modal.path'), value: 'api/sapta/v1/bale/customer-info/' },
    { key: t('modal.host'), value: 'Openapis.bmi.ir' },
    { key: t('modal.upstream'), value: 'ICMS -XzxcZ' },
    { key: t('modal.service_definition_status'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
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
      <InfoBox margin={0} data={data} />
    </Modal>
  );
}
