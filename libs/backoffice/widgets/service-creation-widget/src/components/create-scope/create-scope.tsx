import { Button, Input, Modal } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { createSchemaFieldRule } from 'antd-zod';
import { createScopeSchema, type CreateScopeFormType } from '../../types';
import * as S from './create-scope.style';
import { Form, type FormProps } from 'antd';
import { Scope } from '@oxygen/types';
import { useToggle } from '@oxygen/hooks';
import { CREATE_SCOPE_NAMES } from '../../utils/consts';

type Props = {
  chooseScope: (scope: Scope) => void;
  selectedScope: Scope | null;
};

export default function CreateScope(props: Props) {
  const { chooseScope /* selectedScope */ } = props;
  const [t] = useTr();
  const rule = createSchemaFieldRule(createScopeSchema(t));
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const [form] = Form.useForm<CreateScopeFormType>();
  const asdf = Form.useWatch(form);

  const addScope = () => {
    const { scopeName, persianScopeName } = form.getFieldsValue();
    console.log(':)', 'scopeName', scopeName, 'asdf', asdf);
    chooseScope({ idx: 0, scopeName, persianName: persianScopeName });
    toggleIsModalOpen();
  };

  return (
    <>
      <Form onFinish={toggleIsModalOpen}>
        <S.Create>
          <S.FormItem name={CREATE_SCOPE_NAMES.scopeName} label={t('scope_name')} rules={[rule]}>
            <Input />
          </S.FormItem>
          <S.FormItem name={CREATE_SCOPE_NAMES.persianScopeName} label={t('persian_scope_name')} rules={[rule]}>
            <Input />
          </S.FormItem>
        </S.Create>
        <S.AddBtn htmlType='submit'>{t('add_scope')}</S.AddBtn>
      </Form>

      <Modal
        centered
        title={t('scope')}
        open={isModalOpen}
        closable={true}
        onCancel={toggleIsModalOpen}
        footer={[
          <Button onClick={toggleIsModalOpen} size='large' color='primary' variant='outlined'>
            {t('button.cancel')}
          </Button>,
          <Button onClick={addScope} size='large' color='secondary'>
            {t('submit_and_add')}
          </Button>,
        ]}
      >
        <S.Txt>{t('you_are_adding_scope', { scope: 'asdf' })}</S.Txt>
      </Modal>
    </>
  );
}
