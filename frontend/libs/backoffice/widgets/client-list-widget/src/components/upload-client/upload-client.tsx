import { useTr } from '@oxygen/translation';
import { Input, Modal } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { UploadClient, uploadClient } from '../../types';
import { UPLOAD_CLIENT_NAMES } from '../../utils/consts';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function UploadClient(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();
  const [form] = Form.useForm<UploadClient>();
  const rule = createSchemaFieldRule(uploadClient(t));

  const onFinish: FormProps<UploadClient>['onFinish'] = (values) => {
    console.log(':)', values);
  };

  return (
    <Modal
      open={isOpen}
      centered={true}
      title={t('add_client_from_sso')}
      onCancel={toggle}
      cancelText={t('button.cancel')}
      okText={t('save_changes')}
      onOk={() => form.submit()}
    >
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Form.Item name={UPLOAD_CLIENT_NAMES.uploadClient} label={t('clients_english_name')} rules={[rule]}>
          <Input placeholder={t('oauth_key')} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
