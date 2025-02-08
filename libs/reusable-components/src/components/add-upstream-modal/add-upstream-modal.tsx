import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { MutationStatus } from '@tanstack/react-query';
import { useTr } from '@oxygen/translation';
import { limits } from '@oxygen/utils';
import { Input } from '@oxygen/ui-kit';

import { createUpstreamType, CreateUpstreamType, FORM_ITEM_NAMES } from './add-upstream-modal.schema';
import AnimatedStatus from '../animated-status/animated-status';

import * as S from './add-upstream-modal.style';

interface ReusableFormModalProps {
  title?: string;
  open: boolean;
  setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirm: (values: CreateUpstreamType) => void;
  status: MutationStatus;
  initialData?: CreateUpstreamType;
  successMsg?: string;
  errorMessage?: string;
}

const AddUpstreamModal: React.FC<ReusableFormModalProps> = (props) => {
  const {
    title = 'add-upstream.create_upstream',
    open,
    setOpen,
    onConfirm,
    status,
    initialData,
    successMsg,
    errorMessage = 'uikit.error_description',
  } = props;
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

    const trimmedValues = {
      ...values,
      [FORM_ITEM_NAMES.name]: values[FORM_ITEM_NAMES.name]?.trim(),
      [FORM_ITEM_NAMES.description]: values[FORM_ITEM_NAMES.description]?.trim(),
    };

    onConfirm(trimmedValues);
  };

  const resetModal = () => {
    setOpen(false);
    form.resetFields();
    setIsCreateMode(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setIsCreateMode(true);
  };

  const renderModalContent = () => {
    if (isCreateMode) {
      return (
        <>
          <S.StyledHeader>
            <S.StyledTitle>{t(title)}</S.StyledTitle>
            <S.StyledCloseIcon className={'icon-close-square'} onClick={resetModal} />
          </S.StyledHeader>
          <S.StyledDivider />
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
              <Form.Item name={FORM_ITEM_NAMES.name} label={t('uikit.upstream_english_name')} rules={[rule]}>
                <Input
                  maxLength={limits.DEFAULT_MAX_LENGTH}
                  disabled={!!initialData}
                  placeholder={t('uikit.upstream_english_name')}
                />
              </Form.Item>

              <Form.Item name={FORM_ITEM_NAMES.description} label={t('uikit.upstream_persian_name')} rules={[rule]}>
                <Input maxLength={limits.DEFAULT_MAX_LENGTH} placeholder={t('uikit.upstream_persian_name')} />
              </Form.Item>
            </S.StyledForm>

            <S.StyledButton
              disabled={status === 'pending'}
              onClick={() => form.submit()}
              style={{ marginBottom: '1.6rem' }}
            >
              {t('uikit.register_information')}
            </S.StyledButton>
          </S.StyledContainer>
        </>
      );
    } else {
      return (
        <S.StyledContainer>
          <AnimatedStatus
            status={createStatus[status]}
            errorProps={{
              description: t(errorMessage),
            }}
            loadingProps={{ description: t('uikit.loading_description') }}
            successProps={{ description: successMsg ? t(`${successMsg}`) : '' }}
          />
          {!initialData && createStatus[status] !== 'loading' && (
            <S.StyledButton icon={<i className={'icon-refresh'} />} onClick={() => setIsCreateMode(true)}>
              {t('button.try_again')}
            </S.StyledButton>
          )}
          <S.StyledButton
            color={'primary'}
            variant={'outlined'}
            onClick={resetModal}
            disabled={createStatus[status] === 'loading'}
          >
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
      centered={true}
    >
      {renderModalContent()}
    </S.StyledModal>
  );
};
export default AddUpstreamModal;
