import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';
import * as S from './limits-modal.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  services?: string;
};

export default function LimitsModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, services = `${t('step_three.all_services')}` } = props;

  const callRateOptions = [
    { value: 'second', label: t('step_three.second') },
    { value: 'minute', label: t('step_three.minute') },
    { value: 'hour', label: t('step_three.hour') },
  ];

  const totalCallLimitOptions = [
    { value: 'month', label: t('step_three.in_month') },
    { value: 'week', label: t('step_three.in_week') },
  ];

  return (
    <Modal
      centered
      title={`${t('step_three.restriction_calling')} ${services}`}
      open={isOpen}
      onCancel={toggle}
      footer={[<S.RegisterBtn onClick={toggle}>{t('step_three.register_data')}</S.RegisterBtn>]}
    >
      <S.Content>
        <S.Rate>
          <S.RateTxt>{t('step_three.service_call_rate')}:</S.RateTxt>
          <S.RateInput size='middle' />
          <S.RateTxt>{t('step_three.in')}</S.RateTxt>
        </S.Rate>
        <Select options={callRateOptions} size='middle' />

        <Input placeholder={t('step_three.total_number_calls_limit')} size='middle' />
        <Select options={totalCallLimitOptions} size='middle' />
      </S.Content>
    </Modal>
  );
}
