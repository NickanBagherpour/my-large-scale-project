import { useTr } from '@oxygen/translation';
import { Input, Modal } from '@oxygen/ui-kit';
import { Form, FormProps } from 'antd';
import { TERMINATION_FORM_NAME } from '../utils/const';
import { createSchemaFieldRule } from 'antd-zod';
import * as S from './termination-modal.style';
import { type TerminationType, termaintionSchema } from '../utils/termination-form.schema';

type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function TerminationsModal(props: Props) {
  const { isOpen, close } = props;
  const [t] = useTr();
  const [form] = Form.useForm<TerminationType>();
  const rule = createSchemaFieldRule(termaintionSchema(t));

  const onFinish: FormProps<TerminationType>['onFinish'] = (values) => {
    console.log('>>>>', values);
    // close();
  };

  return (
    <Modal
      centered
      title={t('request_termination')}
      open={isOpen}
      onCancel={close}
      width={600}
      destroyOnClose
      footer={[<S.RegisterBtn onClick={form.submit}>{t('register_data')}</S.RegisterBtn>]}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={TERMINATION_FORM_NAME.echo} rules={[rule]}>
          <Input placeholder={t('echo')} size='middle' />
        </Form.Item>

        <Form.Item name={TERMINATION_FORM_NAME.statusCode} rules={[rule]}>
          <Input placeholder={t('statusCode')} size='middle' />
        </Form.Item>

        <Form.Item name={TERMINATION_FORM_NAME.message} rules={[rule]}>
          <Input placeholder={t('messages')} size='middle' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
