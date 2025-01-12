import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { MutationStatus } from '@tanstack/react-query';
import { Divider, Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { createUpstreamType, CreateUpstreamType, FORM_ITEM_NAMES } from './add-server-modal.schema';
import { AnimatedStatus } from '@oxygen/reusable-components';

import * as S from './modal-add-server.style';

interface ReusableFormModalProps {
  title?: string;
  open: boolean;
  setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirm: (values: CreateUpstreamType) => void;
  status: MutationStatus;
  initialData?: CreateUpstreamType;
  successMsg?: string;
}

const AddUpstreamModal: React.FC<ReusableFormModalProps> = (props) => {
  const { title = 'add-upstream.create_upstream', open, setOpen, onConfirm, status, initialData, successMsg } = props;

  const [isCreateMode, setIsCreateMode] = useState(true);

  const [t] = useTr();
  const rule = createSchemaFieldRule(createUpstreamType(t));
  const [form] = Form.useForm<CreateUpstreamType>();

  const createStatus = {
    success: 'success',
    pending: 'loading',
    idle: 'loading',
    error: 'error',
  } as const;

  useEffect(() => {
    if (initialData && open) {
      // Update form fields whenever the modal is opened and `initialData` changes
      form.setFieldsValue(initialData);
    }
  }, [open, initialData, form]);

  const handleFinish = (values: CreateUpstreamType) => {
    setIsCreateMode(false);
    onConfirm(values);
  };

  const resetModal = () => {
    setOpen(false);
    form.resetFields();
    setIsCreateMode(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const values = Form.useWatch([], form);
  const isFormEmpty = !values?.[FORM_ITEM_NAMES.name] || !values?.[FORM_ITEM_NAMES.description];

  const renderModalContent = () => {
    if (isCreateMode) {
      return (
        <>
          <S.StyledHeader>
            <S.StyledTitle>{t(title)}</S.StyledTitle>
            <S.StyledCloseIcon className={'icon-close-square'} onClick={resetModal} />
          </S.StyledHeader>
          <Divider />
          <S.StyledContainer>
            <S.StyledForm
              layout='horizontal'
              labelAlign='left'
              labelCol={{ span: 8 }}
              style={{ width: '100%' }}
              form={form}
              onFinish={handleFinish}
              colon={true}
              initialValues={initialData}
            >
              <Form.Item name={FORM_ITEM_NAMES.name} label={t('add_upstream.upstream_english_name')} rules={[rule]}>
                <Input allow='letter' disabled={!!initialData} />
              </Form.Item>

              <Form.Item
                name={FORM_ITEM_NAMES.description}
                label={t('add_upstream.upstream_persian_name')}
                rules={[rule]}
              >
                <Input allow='letter' />
              </Form.Item>
            </S.StyledForm>

            <S.StyledButton
              disabled={status === 'pending' || isFormEmpty}
              onClick={() => form.submit()}
              style={{ marginBottom: '1.6rem' }}
            >
              {t('add_upstream.register_information')}
            </S.StyledButton>
          </S.StyledContainer>
        </>
      );
    } else {
      return (
        <S.StyledContainer>
          <AnimatedStatus
            status={createStatus[status]}
            errorProps={{ description: t('add_upstream.error_description') }}
            loadingProps={{ description: t('add_upstream.loading_description') }}
            successProps={{ description: successMsg ? t(`${successMsg}`) : '' }}
          />
          {!initialData && (
            <S.StyledButton icon={<i className={'icon-refresh'} />} onClick={() => setIsCreateMode(true)}>
              {t('button.try_again')}
            </S.StyledButton>
          )}
          <S.StyledButton color={'primary'} variant={'outlined'} onClick={resetModal}>
            {t('button.return')}
          </S.StyledButton>
        </S.StyledContainer>
      );
    }
  };
  return (
    <S.StyledModal
      open={open}
      onCancel={handleCancel}
      confirmLoading={status === 'pending'}
      destroyOnClose={true}
      closeIcon={false}
      headerDivider={false}
      footer={false}
    >
      {renderModalContent()}
    </S.StyledModal>
  );
};
export default AddUpstreamModal;
