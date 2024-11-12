import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';
import * as S from './limitations-modal.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function LimitationsModal(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();

  const callRateOptions = [
    { value: 'second', label: t('second') },
    { value: 'minute', label: t('minute') },
    { value: 'hour', label: t('hour') },
  ];

  const totalCallLimitOptions = [
    { value: 'month', label: t('in_month') },
    { value: 'week', label: t('in_week') },
  ];

  return (
    <Modal
      centered
      title={t('call_limitation_for_all_services')}
      open={isOpen}
      onCancel={toggle}
      footer={[<S.RegisterBtn onClick={toggle}>{t('register_data')}</S.RegisterBtn>]}
    >
      <S.Content>
        <S.Rate>
          <S.RateTxt>{t('service_call_rate')}:</S.RateTxt>
          <S.RateInput size='middle' />
          <S.RateTxt>{t('in')}</S.RateTxt>
        </S.Rate>
        <Select options={callRateOptions} size='middle' />

        <Input placeholder={t('total_number_of_calls_limit')} size='middle' />
        <Select options={totalCallLimitOptions} size='middle' />
      </S.Content>
    </Modal>
  );
}
