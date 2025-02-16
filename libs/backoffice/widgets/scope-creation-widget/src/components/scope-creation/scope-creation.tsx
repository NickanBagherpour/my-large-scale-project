import React, { useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, Modal, SearchItemsContainer } from '@oxygen/ui-kit';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { ROUTES, RQKEYS, trimValues } from '@oxygen/utils';

import { CreateScopeType, createScopeType } from '../../types';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
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
  const { mutate: createScope, isPending: loadingCreateScope } = useCreateScope();
  const queryClient = useQueryClient();

  const [form] = Form.useForm<CreateScopeType>();

  const rule = createSchemaFieldRule(createScopeType(t));

  const submitClick = () => {
    form.submit();
  };

  const showModal = async () => {
    try {
      await form?.validateFields();
      setIsOpen(true);
    } catch (error) {
      return false;
    }
  };

  const onCancel = () => setIsOpen(false);

  const handleReturn = () => {
    router.back();
  };

  const onFinish = async (values: any) => {
    const { englishNameScope, persianNameScope } = values;
    const params: CreateScopeType = {
      name: englishNameScope,
      description: persianNameScope,
    };

    createScope(trimValues(params), {
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
    const englishNameScope = form.getFieldValue(FORM_ITEM_NAMES.englishNameScope) || '';

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
        <p>{t('modal_text', { scope_name: englishNameScope })}</p>
      </Modal>
    );
  };

  return (
    <S.ScopeCreationContainer>
      <div className={'form-wrapper'}>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          {isOpen && SubmitModal()}
          <SearchItemsContainer>
            <Form.Item
              name={FORM_ITEM_NAMES.englishNameScope}
              className={'span-2'}
              label={t('form.english_name_scope')}
              rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholder.english_name')} />
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
        <Button htmlType={'button'} onClick={showModal}>
          {t('buttons.register_scope')}
        </Button>
      </FooterContainer>
    </S.ScopeCreationContainer>
  );
};

export default ScopeCreation;
