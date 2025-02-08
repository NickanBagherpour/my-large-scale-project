import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';
import { Checkbox, Form, FormProps } from 'antd';
import { TERMINATION_FORM_NAME } from '../utils/const';
import { createSchemaFieldRule } from 'antd-zod';
import * as S from './termination-modal.style';
import { type TerminationType, termaintionSchema } from '../utils/termination-form.schema';
import { PluginConfig, RequestTerminationConfig } from '../utils/plugins.type';

type Props = {
  isOpen: boolean;
  close: () => void;
  isPending: boolean;
  plugin: RequestTerminationConfig;
  onSubmit: (values: PluginConfig) => void;
};

const statusOptions = [
  { value: 200, label: '200' },
  { value: 400, label: '400' },
  { value: 500, label: '500' },
];

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
        message,
        statusCode: +statusCode,
      },
    });
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
      <Form form={form} onFinish={onFinish} initialValues={plugin.config}>
        <Form.Item name={TERMINATION_FORM_NAME.echo} rules={[rule]} valuePropName='checked'>
          <Checkbox>{t('echo')}</Checkbox>
        </Form.Item>

        <Form.Item name={TERMINATION_FORM_NAME.statusCode} rules={[rule]}>
          <Select placeholder={t('statusCode')} options={statusOptions} size='middle' />
        </Form.Item>

        <Form.Item name={TERMINATION_FORM_NAME.message} rules={[rule]}>
          <Input placeholder={t('messages')} size='middle' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
