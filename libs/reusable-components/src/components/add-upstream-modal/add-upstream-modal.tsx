import React, { useState } from 'react';
import { Form } from 'antd';

import { Divider, Input, Typography } from '@oxygen/ui-kit';

import { createUpstreamType, CreateUpstreamType, FORM_ITEM_NAMES } from './add-upstream-modal.schema';

import * as S from './add-upstream-modal.style';
import { createSchemaFieldRule } from 'antd-zod';
import { useTr } from '@oxygen/translation';

interface ReusableFormModalProps {
  title: string;
  open: boolean;
  confirmLoading: boolean;
  onCancel: () => void;
  onConfirm: (values: CreateUpstreamType) => void;
}

const AddUpstreamModal: React.FC<ReusableFormModalProps> = (props) => {
  const { title, open, confirmLoading, onCancel, onConfirm } = props;

  const [modalState, setModalState] = useState<'create' | 'error'>('create');

  const [t] = useTr();
  const rule = createSchemaFieldRule(createUpstreamType(t));
  const [form] = Form.useForm<CreateUpstreamType>();

  const handleFinish = (values: CreateUpstreamType) => {
    onConfirm(values);
  };
  const renderModalContent = () => {
    if (modalState === 'create') {
      return (
        <>
          <S.StyledHeader>
            <Typography.Title>{t('create_upstream')}</Typography.Title>
          </S.StyledHeader>
          <Divider />
          <S.StyledForm
            layout='horizontal'
            labelAlign='left'
            labelCol={{ span: 8 }}
            style={{ width: '100%' }}
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item name={FORM_ITEM_NAMES.name} label={t('upstream_english_name')} rules={[rule]}>
              <Input allow='letter' />
            </Form.Item>

            <Form.Item name={FORM_ITEM_NAMES.description} label={t('upstream_persian_name')} rules={[rule]}>
              <Input allow='letter' />
            </Form.Item>
          </S.StyledForm>
        </>
      );
    } else if (modalState === 'error') {
      return <span>errrrrrrrrrror</span>;
    }
  };
  return (
    <S.StyledModal
      open={open}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      // okText={t('register_information')}
      onConfirm={() => form.submit()}
      destroyOnClose={true}
    >
      //TODO add header(title,close button and divider)
      {renderModalContent()}
    </S.StyledModal>
  );
};
export default AddUpstreamModal;
