import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';
import * as S from './limitations-modal.style';
import { Form, FormProps } from 'antd';
import { LIMITAION_FORM_NAME } from '../utils/const';
import { createSchemaFieldRule } from 'antd-zod';
import { limitationsSchema, LimitationsType } from '../utils/limitation-form.schema';
import { PluginConfig, RateLimitingConfig } from '../utils/plugins.type';

type Props = {
  isOpen: boolean;
  close: () => void;
  isPending: boolean;
  onSubmit: (values: PluginConfig) => void;
  plugin: RateLimitingConfig;
};

export default function LimitationsModal(props: Props) {
  const { isOpen, close, onSubmit, isPending, plugin } = props;
  const [t] = useTr();
  const [form] = Form.useForm<LimitationsType>();
  const rule = createSchemaFieldRule(limitationsSchema(t));

  const callRateOptions = [
    { value: 'second', label: t('second') },
    { value: 'minute', label: t('minute') },
    { value: 'hour', label: t('hour') },
  ];

  const totalCallLimitOptions = [
    { value: 'month', label: t('in_month') },
    { value: 'week', label: t('in_week') },
  ];

  const get = () => {
    const time = ['second', 'minute', 'hour'];
    const calendar = ['week', 'month'];

    const obj = {};

    time.forEach((item) => {
      if (plugin[item]) {
        obj['totalCallLimit'] = item;
        obj['serviceCallRate'] = plugin[item];
      }
    });

    calendar.forEach((item) => {
      if (plugin[item]) {
        obj['totalCallLimit'] = item;
        obj['serviceCallRate'] = plugin[item];
      }
    });

    return obj;
  };

  // console.log('>>>', get());

  const onFinish: FormProps<LimitationsType>['onFinish'] = (values) => {
    const { totalCallLimit, serviceCallRate, callLimitOptions, serviceCallRateOptions } = values;
    onSubmit({
      name: 'rate-limiting',
      enabled: true,
      config: {
        [serviceCallRateOptions]: +serviceCallRate,
        [callLimitOptions]: +totalCallLimit,
      },
    });
  };

  return (
    <Modal
      centered
      title={t('call_limitation_for_all_services')}
      open={isOpen}
      onCancel={close}
      width={600}
      destroyOnClose
      footer={[
        <S.RegisterBtn onClick={form.submit} loading={isPending} disabled={isPending}>
          {t('register_data')}
        </S.RegisterBtn>,
      ]}
    >
      <S.Form form={form} onFinish={onFinish}>
        <S.Div>
          <S.RateLimit label={t('service_call_rate')} name={LIMITAION_FORM_NAME.serviceCallRate} rules={[rule]} colon>
            <S.RateInput size='middle' />
          </S.RateLimit>
          <span>{t('in')}</span>
        </S.Div>

        <Form.Item name={LIMITAION_FORM_NAME.serviceCallRateOptions} rules={[rule]}>
          <Select options={callRateOptions} size='middle' />
        </Form.Item>

        <Form.Item name={LIMITAION_FORM_NAME.totalCallLimit} rules={[rule]}>
          <Input placeholder={t('total_number_of_calls_limit')} size='middle' />
        </Form.Item>
        <Form.Item name={LIMITAION_FORM_NAME.callLimitOptions} rules={[rule]}>
          <Select options={totalCallLimitOptions} size='middle' />
        </Form.Item>
      </S.Form>
    </Modal>
  );
}
