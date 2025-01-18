import React, { useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, Modal, SearchItemsContainer } from '@oxygen/ui-kit';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { ROUTES, RQKEYS } from '@oxygen/utils';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { FormSchema } from '../../types';
import { MAX_LENGTH_INPUT } from '../../utils/consts';
import { useCreateScope } from '../../services/create-scope.api';

import * as S from './scope-creation.style';

type EditScopeProps = PageProps & {
  //
};

const ScopeCreation: React.FC<EditScopeProps> = (props) => {
  const [t] = useTr();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutate: createScope, isPending: loadingCreateScope } = useCreateScope();
  const queryClient = useQueryClient();

  const rule = createSchemaFieldRule(FormSchema(t));

  const submitClick = () => {
    form.submit();
  };

  const showModal = async () => {
    await form.validateFields();
    setIsOpen(true);
  };

  const onCancel = () => setIsOpen(false);

  const handleReturn = () => {
    router.back();
  };

  const onFinish = async (values: any) => {
    const { latinNameScope, persianNameScope } = values;
    const params: any = {
      name: latinNameScope.trim(),
      description: persianNameScope.trim(),
    };

    createScope(params, {
      onSuccess: async () => {
        try {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BACKOFFICE.SCOPE],
          });

          onCancel();
          router.push(ROUTES.BACKOFFICE.SCOPE_LIST);
        } catch (error) {
          onCancel();
        }
      },
      onError: (error) => {
        onCancel();
      },
    });
  };

  const SubmitModal = () => {
    return (
      <Modal
        open={isOpen}
        centered={true}
        title={t('create_scope')}
        onCancel={onCancel}
        confirmLoading={loadingCreateScope}
        cancelText={t('button.cancel')}
        okText={t('buttons.confirm')}
        onOk={submitClick}
      >
        <p>{t('modal_text', { scope_name: form.getFieldValue(FORM_ITEM_NAMES.latinNameScope) })}</p>
      </Modal>
    );
  };

  return (
    <S.ScopeCreationContainer>
      <div className={'form-wrapper'}>
        {SubmitModal()}
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <Form.Item
              name={FORM_ITEM_NAMES.latinNameScope}
              className={'span-2'}
              label={t('form.latin_name_scope')}
              rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholder.latin_name')} />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM_NAMES.persianNameScope}
              className={'span-2'}
              label={t('form.persian_name_scope')}
              rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholder.persian_name')} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('button.cancel')}
        </ReturnButton>
        <Button htmlType={'submit'} onClick={showModal}>
          {t('buttons.register_scope')}
        </Button>
      </FooterContainer>
    </S.ScopeCreationContainer>
  );
};

export default ScopeCreation;
