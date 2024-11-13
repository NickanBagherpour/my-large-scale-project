import { SyntheticEvent } from 'react';

import { useTr } from '@oxygen/translation';
import { BasicComponentProps } from '@oxygen/types';
import { ButtonProps, Input, InputProps, Modal, ModalProps, Select, SelectProps } from '@oxygen/ui-kit';

import * as S from './service-call-limit.style';

type AppProps = BasicComponentProps &
  ModalProps & {
    isOpen?: boolean;
    onCancel?: (e?: SyntheticEvent) => void;
    onApply?: (e?: SyntheticEvent) => void;
    ApplyBtnProps?: ButtonProps;
    title: string;
    callRateSelectProps?: SelectProps;
    totalCallRateSelectProps?: SelectProps;
    rateInputProps?: InputProps;
    totalRateInputProps?: InputProps;
    serviceRateText?: string;
    applyButtonText?: string;
  };
const ServiceCallLimit: React.FC<AppProps> = ({
  isOpen,
  onCancel,
  onApply,
  title,
  ApplyBtnProps,
  callRateSelectProps,
  totalCallRateSelectProps,
  rateInputProps,
  totalRateInputProps,
  serviceRateText,
  applyButtonText,
  children,
  ...rest
}) => {
  const [t] = useTr();
  // const { isOpen, toggle, services = `${t('step_three.all_services')}` } = props;

  const callRateOptions = [
    { value: 'second', label: t('service_call.second') },
    { value: 'minute', label: t('service_call.minute') },
    { value: 'hour', label: t('service_call.hour') },
  ];

  const totalCallLimitOptions = [
    { value: 'month', label: t('service_call.in_month') },
    { value: 'week', label: t('service_call.in_week') },
  ];

  return (
    <Modal
      centered
      title={title}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <S.FooterButton block={true} onClick={onApply} {...ApplyBtnProps}>
          {applyButtonText ?? t('service_call.register_data')}
        </S.FooterButton>,
      ]}
      {...rest}
    >
      {!children ? (
        <S.Content>
          <S.Rate>
            <S.RateTxt>{serviceRateText ?? t('service_call.service_call_rate')}:</S.RateTxt>
            <S.RateInput size='middle' {...rateInputProps} />
            <S.RateTxt>{t('service_call.in')}</S.RateTxt>
          </S.Rate>
          <Select options={callRateOptions} size='middle' {...callRateSelectProps} />

          <Input placeholder={t('service_call.total_number_calls_limit')} size='middle' {...totalRateInputProps} />
          <Select options={totalCallLimitOptions} size='middle' {...totalCallRateSelectProps} />
        </S.Content>
      ) : (
        children
      )}
    </Modal>
  );
};
export default ServiceCallLimit;
