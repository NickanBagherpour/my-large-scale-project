import { Form } from 'antd';
import { FormProps } from 'antd/lib';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';

import { LIMITAION_FORM_NAME } from '../../../utils/consts';
import { limitationsSchema, LimitationsType } from '../../../types/limitation-form.schema';

import * as S from './limits-modal.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  services?: string;
};

export default function LimitsModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, services = `${t('step_three.all_services')}` } = props;

  const [form] = Form.useForm<LimitationsType>();
  const rule = createSchemaFieldRule(limitationsSchema(t));

  const callRateOptions = [
    { value: 'second', label: t('step_three.second') },
    { value: 'minute', label: t('step_three.minute') },
    { value: 'hour', label: t('step_three.hour') },
  ];

  const totalCallLimitOptions = [
    { value: 'month', label: t('step_three.in_month') },
    { value: 'week', label: t('step_three.in_week') },
  ];

  const onFinish: FormProps<LimitationsType>['onFinish'] = () => {
    toggle();
  };

  return (
    <Modal
      centered
      title={`${t('step_three.restriction_calling')} ${services}`}
      open={isOpen}
      onCancel={toggle}
      width={600}
      footer={[<S.RegisterBtn onClick={toggle}>{t('step_three.register_data')}</S.RegisterBtn>]}
    >
      <S.Form form={form} onFinish={onFinish}>
        <S.Div>
          <S.RateLimit
            label={t('step_three.service_call_rate')}
            name={LIMITAION_FORM_NAME.serviceCallRate}
            rules={[rule]}
            colon
          >
            <S.RateInput size='middle' />
          </S.RateLimit>
          <span>{t('step_three.in')}</span>
        </S.Div>

        <Form.Item name={LIMITAION_FORM_NAME.serviceCallRateOptions} rules={[rule]}>
          <Select options={callRateOptions} size='middle' />
        </Form.Item>

        <Form.Item name={LIMITAION_FORM_NAME.totalCallLimit} rules={[rule]}>
          <Input placeholder={t('step_three.total_number_calls_limit')} size='middle' />
        </Form.Item>
        <Form.Item name={LIMITAION_FORM_NAME.callLimitOptions} rules={[rule]}>
          <Select options={totalCallLimitOptions} size='middle' />
        </Form.Item>
      </S.Form>
    </Modal>
  );
}
