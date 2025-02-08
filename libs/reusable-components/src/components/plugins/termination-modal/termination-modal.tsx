import { useTr } from '@oxygen/translation';
import { Input, Modal } from '@oxygen/ui-kit';
import { Checkbox, Form, FormProps } from 'antd';
import { TERMINATION_FORM_NAME } from '../utils/const';
import { createSchemaFieldRule } from 'antd-zod';
import * as S from './termination-modal.style';
import { type TerminationType, termaintionSchema } from '../utils/termination-form.schema';
import { PluginConfig, RequestTerminationConfig } from '../utils/plugins.type';
import { stat } from 'fs';

type Props = {
  isOpen: boolean;
  close: () => void;
  isPending: boolean;
  plugin: RequestTerminationConfig;
  onSubmit: (values: PluginConfig) => void;
};

export default function TerminationsModal(props: Props) {
  const { isOpen, close, onSubmit, isPending, plugin } = props;
  const [t] = useTr();
  const [form] = Form.useForm<TerminationType>();
  const rule = createSchemaFieldRule(termaintionSchema(t));

  const onFinish: FormProps<TerminationType>['onFinish'] = (values) => {
    const { echo, message, statusCode } = values;
    onSubmit({
      title: '',
      name: 'request-termination',
      enabled: true,
      config: {
        echo,
        message: message.trim(),
        statusCode: +statusCode,
      },
    });
  };

  const getInitailValues = () => {
    const { statusCode, message, echo } = plugin.config;
    return {
      echo: echo || false,
      message: message || '',
      statusCode: statusCode ? statusCode + '' : '', // converting statusCode to string
    };
  };

  return (
    <Modal
      centered
      title={t('request_termination')}
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
      <S.Form form={form} onFinish={onFinish} initialValues={getInitailValues()}>
        <S.Row>
          <Form.Item
            name={TERMINATION_FORM_NAME.statusCode}
            rules={[rule]}
            label={t('status_code')}
            className='first-item'
          >
            <Input allow={'number'} type='number' size='middle' />
          </Form.Item>

          <Form.Item name={TERMINATION_FORM_NAME.echo} rules={[rule]} valuePropName='checked' label={t('echo')}>
            <Checkbox></Checkbox>
          </Form.Item>
        </S.Row>

        <Form.Item name={TERMINATION_FORM_NAME.message} rules={[rule]} label={t('msg')} className='first-item'>
          <Input size='middle' />
        </Form.Item>
      </S.Form>
    </Modal>
  );
}
