import React from 'react';
import { Form } from 'antd';

import { Input } from '@oxygen/ui-kit';

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

  const [t] = useTr();
  const rule = createSchemaFieldRule(createUpstreamType(t));
  const [form] = Form.useForm<CreateUpstreamType>();

  const handleFinish = (values: CreateUpstreamType) => {
    onConfirm(values);
  };

  return (
    <S.StyledModal
      title={title}
      open={open}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText={t('register_information')}
      showConfirm={true}
      showCancel={false}
      onConfirm={() => form.submit()}
      destroyOnClose={true}
    >
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
    </S.StyledModal>
  );
};
export default AddUpstreamModal;
