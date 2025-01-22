import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { MutationStatus } from '@tanstack/react-query';
import { Divider, Input, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { createServerType, CreateServerType, FORM_ITEM_NAMES } from './add-server-modal.schema';
import { AnimatedStatus } from '@oxygen/reusable-components';
import { MAX_INPUTE_LENGTH } from '../../utils/consts';

import * as S from './modal-add-server.style';

interface ReusableFormModalProps {
  title: string;
  open: boolean;
  setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirm: (values: CreateServerType) => void;
  status: MutationStatus;
  initialData?: CreateServerType;
  successMsg?: string;
  selectedServerId?: number | null;
}

const AddServerModal: React.FC<ReusableFormModalProps> = (props) => {
  const { title, open, setOpen, onConfirm, status, initialData, successMsg, selectedServerId } = props;

  const [isCreateMode, setIsCreateMode] = useState(true);

  const [t] = useTr();
  const rule = createSchemaFieldRule(createServerType(t));
  const [form] = Form.useForm<CreateServerType>();

  const [formKey, setFormKey] = useState(0);

  const createStatus = {
    success: 'success',
    pending: 'loading',
    idle: 'loading',
    error: 'error',
  } as const;

  useEffect(() => {
    if (!initialData && open) {
      form.resetFields();
      setIsCreateMode(true);
    }
  }, [open, initialData, form]);

  const handleFinish = (values: CreateServerType) => {
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
    setIsCreateMode(true);
    setFormKey((prevKey) => prevKey + 1);
  };
  const values = Form.useWatch([], form);
  const isFormEmpty = !values?.[FORM_ITEM_NAMES.domain] || !values?.[FORM_ITEM_NAMES.weight];

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
              key={formKey}
              layout='horizontal'
              labelAlign='left'
              labelCol={{ span: 8 }}
              style={{ width: '100%' }}
              form={form}
              onFinish={handleFinish}
              colon={true}
              initialValues={initialData}
            >
              <Form.Item name={FORM_ITEM_NAMES.domain} label={t('domain')} rules={[rule]}>
                <Input maxLength={MAX_INPUTE_LENGTH} />
              </Form.Item>
              <Form.Item name={FORM_ITEM_NAMES.weight} label={t('weight')} rules={[rule]}>
                <Input allow={'number'} maxLength={MAX_INPUTE_LENGTH} />
              </Form.Item>

              <Form.Item name={FORM_ITEM_NAMES.healthStatus} label={t('health_some')} rules={[rule]} initialValue={'1'}>
                <Select size={'large'} disabled={true}>
                  <Select.Option value='1'>{t('health')}</Select.Option>
                  <Select.Option value='0'>{t('unHealth')}</Select.Option>
                </Select>
              </Form.Item>
            </S.StyledForm>

            <S.StyledButton
              disabled={status === 'pending' || isFormEmpty}
              onClick={() => form.submit()}
              style={{ marginBottom: '1.6rem' }}
            >
              {selectedServerId ? t('edit_server') : t('register_server')}
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
          {!initialData && status !== 'pending' && status !== 'success' && (
            <S.StyledButton icon={<i className={'icon-refresh'} />} onClick={() => setIsCreateMode(true)}>
              {t('button.try_again')}
            </S.StyledButton>
          )}
          {status !== 'pending' && (
            <S.StyledButton color={'primary'} variant={'outlined'} onClick={resetModal}>
              {t('button.return')}
            </S.StyledButton>
          )}
          {status === 'pending' && (
            <S.StyledButton color={'primary'} variant={'outlined'} onClick={resetModal}>
              {t('button.cancellation')}
            </S.StyledButton>
          )}
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
export default AddServerModal;
