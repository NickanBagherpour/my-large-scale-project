import { Input, Select, Button } from '@oxygen/ui-kit';
import * as S from './add-server-modal.style';
import { Form, FormProps } from 'antd';
import { useTr } from '@oxygen/translation';
import { addServerSchema, AddServerType } from '../../types/add-server.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { ADD_SERVER_NAMES } from '../../utils/consts';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const options = [
  { label: 'گزینه اول', value: '1' },
  { label: 'گزینه دوم', value: '2' },
  { label: 'گزینه سوم', value: '3' },
];

export default function AddServerModal(props: Props) {
  const { isOpen, toggle } = props;
  const [t] = useTr();
  const [form] = Form.useForm<AddServerType>();
  const rule = createSchemaFieldRule(addServerSchema(t));

  const onFinish: FormProps<AddServerType>['onFinish'] = () => {
    toggle();
  };

  return (
    <S.Modal
      centered
      title={t('add_server')}
      open={isOpen}
      onCancel={toggle}
      width={600}
      destroyOnClose
      footer={[<Button onClick={form.submit}>{t('register_server')}</Button>]}
    >
      <Form form={form} onFinish={onFinish} colon preserve={false}>
        <S.FormItem name={ADD_SERVER_NAMES.domainOrIpPort} rules={[rule]} label={t('domainOrIpPort')}>
          <Input size='large' />
        </S.FormItem>

        <S.FormItem name={ADD_SERVER_NAMES.weight} rules={[rule]} label={t('weight')}>
          <Input size='large' />
        </S.FormItem>

        <S.FormItem name={ADD_SERVER_NAMES.health} rules={[rule]} label={t('health')}>
          <Select options={options} size='large' />
        </S.FormItem>
      </Form>
    </S.Modal>
  );
}
