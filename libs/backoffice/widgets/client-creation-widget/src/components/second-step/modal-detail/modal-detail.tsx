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
    { key: t('step_two.english_name'), value: 'svc-gfg-bhhj-ngdc-zxzxc-zxc' },
    { key: t('step_two.persian_name'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
    { key: t('step_two.action'), value: 'Post' },
    { key: t('step_two.protocole'), value: 'HTTP' },
    { key: t('step_two.access'), value: 'PUBLIC' },
    { key: t('step_two.category'), value: 'ACCOUNT' },
    { key: t('step_two.throughout'), value: 'Throughout' },
    { key: t('step_two.version'), value: 'V1' },
    { key: t('step_two.owner'), value: 'Sadad' },
    { key: t('step_two.tag'), value: 'CUSOTMER' },
    { key: t('step_two.path'), value: 'api/sapta/v1/bale/customer-info/' },
    { key: t('step_two.host'), value: 'Openapis.bmi.ir' },
    { key: t('step_two.upstream_details'), value: 'ICMS -XzxcZ' },
    { key: t('step_two.descriptions'), value: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
  ];

  return (
    <Modal
      centered
      title={t('step_two.service_detail')}
      open={isOpen}
      onCancel={toggle}
      width={1000}
      footer={[
        <Button size='large' color='primary' variant='outlined' onClick={toggle}>
          {t('close')}
        </Button>,
      ]}
    >
      <InfoBox margin={0} data={data} />
    </Modal>
  );
}
