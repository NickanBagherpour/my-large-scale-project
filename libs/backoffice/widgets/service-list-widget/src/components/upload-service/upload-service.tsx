import { useTr } from '@oxygen/translation';
import { Input, Modal } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { type UploadServiceType, uploadService } from '../../types';
import { UPLOAD_SERVICE_NAMES } from '../../utils/consts';
import * as S from './upload-service.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function UploadClient(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();
  const [form] = Form.useForm<UploadServiceType>();
  const rule = createSchemaFieldRule(uploadService(t));

  const onFinish: FormProps<UploadServiceType>['onFinish'] = (values) => {
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
      title={t('add_service_from_sso')}
      onCancel={onCancel}
      cancelText={t('button.cancel')}
      okText={t('save_changes')}
      onOk={() => form.submit()}
    >
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FormItem name={UPLOAD_SERVICE_NAMES.uploadService} label={t('services_english_name')} rules={[rule]}>
          <Input placeholder={t('oauth_key')} />
        </S.FormItem>
      </Form>
    </Modal>
  );
}
