import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';
import * as S from './limitations-modal.style';
import { Form, FormProps } from 'antd';
import { LIMITAION_FORM_NAME } from '../utils/const';
import { createSchemaFieldRule } from 'antd-zod';
import { limitationsSchema, LimitationsType } from '../utils/limitation-form.schema';
import { PluginConfig, RateLimitingConfig } from '../utils/plugins.type';
import { ComponentProps } from 'react';

type Props = {
  isOpen: boolean;
  close: () => void;
  isPending: boolean;
  onSubmit: (values: PluginConfig) => void;
  plugin: RateLimitingConfig;
};

type SelectOptions = ComponentProps<typeof Select>['options'];

export default function LimitationsModal(props: Props) {
  const { isOpen, close, onSubmit, isPending, plugin } = props;
  const [t] = useTr();
  const [form] = Form.useForm<LimitationsType>();
  const rule = createSchemaFieldRule(limitationsSchema(t));

  const callRateOptions = [
    { value: 'second', label: t('uikit.second') },
    { value: 'minute', label: t('uikit.minute') },
    { value: 'hour', label: t('uikit.hour') },
  ] as const;

  const totalCallLimitOptions = [
    { value: 'day', label: t('uikit.in_day') },
    { value: 'month', label: t('uikit.in_month') },
    { value: 'year', label: t('uikit.in_year') },
  ] as const;

  const getInitialValue = () => {
    const time: (typeof callRateOptions)[number]['value'][] = ['second', 'minute', 'hour'];
    const calendar: (typeof totalCallLimitOptions)[number]['value'][] = ['day', 'month', 'year'];

    const initialValue = {};

    time.forEach((item) => {
      if (plugin.config[item]) {
        initialValue['serviceCallRateOptions'] = item;
        initialValue['serviceCallRate'] = plugin.config[item] + '';
      }
    });

    calendar.forEach((item) => {
      if (plugin.config[item]) {
        initialValue['totalCallLimit'] = plugin.config[item] + '';
        initialValue['callLimitOptions'] = item;
      }
    });

    return initialValue;
  };

  const onFinish: FormProps<LimitationsType>['onFinish'] = (values) => {
    const { totalCallLimit, serviceCallRate, callLimitOptions, serviceCallRateOptions } = values;
    onSubmit({
      title: '',
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
      title={t('uikit.call_limitation_plugin')}
      open={isOpen}
      onCancel={close}
      width={600}
      destroyOnClose
      footer={[
        <S.RegisterBtn onClick={form.submit} loading={isPending} disabled={isPending}>
          {t('uikit.register_data')}
        </S.RegisterBtn>,
      ]}
    >
      <S.Form form={form} onFinish={onFinish} initialValues={getInitialValue()}>
        <S.Div>
          <S.RateLimit
            label={t('uikit.service_call_rate')}
            name={LIMITAION_FORM_NAME.serviceCallRate}
            rules={[rule]}
            colon
          >
            <S.RateInput size='middle' />
          </S.RateLimit>
          <span>{t('uikit.in')}</span>
        </S.Div>

        <Form.Item name={LIMITAION_FORM_NAME.serviceCallRateOptions} rules={[rule]}>
          <Select options={callRateOptions as unknown as SelectOptions} size='middle' />
        </Form.Item>

        <Form.Item name={LIMITAION_FORM_NAME.totalCallLimit} rules={[rule]}>
          <Input placeholder={t('uikit.total_number_of_calls_limit')} size='middle' />
        </Form.Item>
        <Form.Item name={LIMITAION_FORM_NAME.callLimitOptions} rules={[rule]}>
          <Select options={totalCallLimitOptions as unknown as SelectOptions} size='middle' />
        </Form.Item>
      </S.Form>
    </Modal>
  );
}
