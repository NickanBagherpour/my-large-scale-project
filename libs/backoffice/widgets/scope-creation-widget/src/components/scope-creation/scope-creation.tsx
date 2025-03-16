import React, { useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { ROUTES, RQKEYS, trimValues } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';

import { CreateScopeType, createScopeType, ModalStateType } from '../../types';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';
import { useCreateScope } from '../../services/create-scope.api';
import ConfirmModal from '../confirm-modal/confirm-modal';

import * as S from './scope-creation.style';

type EditScopeProps = PageProps & {
  //
};

const ScopeCreation: React.FC<EditScopeProps> = (props) => {
  const [t] = useTr();
  const { notification } = useApp();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<ModalStateType>(false);

  const { mutate: createScope, isPending: loadingCreateScope } = useCreateScope();

  const [form] = Form.useForm<CreateScopeType>();

  const rule = createSchemaFieldRule(createScopeType(t));

  const handleReturn = () => {
    router.back();
  };

  const onCancel = () => setIsOpen(false);

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

          notification.success({
            message: t('success_message', { scope_name: params?.name }),
          });
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
      <ConfirmModal
        loading={loadingCreateScope}
        onSubmit={submitClick}
        englishNameScope={englishNameScope}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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
              // rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholder.persian_name')} disabled />
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
