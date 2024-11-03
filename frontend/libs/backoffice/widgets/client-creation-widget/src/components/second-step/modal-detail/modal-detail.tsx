import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Modal } from '@oxygen/ui-kit';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function DetailModal(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();

  const data = [
    { key: t('english_name'), value: 'svc-gfg-bhhj-ngdc-zxzxc-zxc' },
    { key: t('persian_name'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
    { key: t('action'), value: 'Post' },
    { key: t('protocole'), value: 'HTTP' },
    { key: t('access'), value: 'PUBLIC' },
    { key: t('category'), value: 'ACCOUNT' },
    { key: t('throughout'), value: 'Throughout' },
    { key: t('version'), value: 'V1' },
    { key: t('owner'), value: 'Sadad' },
    { key: t('tag'), value: 'CUSOTMER' },
    { key: t('path'), value: 'api/sapta/v1/bale/customer-info/' },
    { key: t('host'), value: 'Openapis.bmi.ir' },
    { key: t('upstream_details'), value: 'ICMS -XzxcZ' },
    { key: t('descriptions'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
  ];

  return (
    <Modal
      centered
      title={t('service_detail')}
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
