import { useTr } from '@oxygen/translation';
import { Input, Modal } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { type UploadClientType, uploadClient } from '../../types';
import { UPLOAD_CLIENT_NAMES } from '../../utils/consts';
import * as S from './upload-client.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function UploadClient(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();
  const [form] = Form.useForm<UploadClientType>();
  const rule = createSchemaFieldRule(uploadClient(t));

  const onFinish: FormProps<UploadClientType>['onFinish'] = (values) => {
    console.log(':)', values);
    form.resetFields();
    toggle();
  };

  const onCancel = () => {
    form.resetFields();
    toggle();
  };

  return (
    <Modal
      open={isOpen}
      centered={true}
      title={t('add_client_from_sso')}
      onCancel={onCancel}
      cancelText={t('button.cancel')}
      okText={t('save_changes')}
      onOk={() => form.submit()}
    >
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FormItem name={UPLOAD_CLIENT_NAMES.uploadClient} label={t('clients_english_name')} rules={[rule]}>
          <Input placeholder={t('oauth_key')} />
        </S.FormItem>
      </Form>
    </Modal>
  );
}
