import { useState } from 'react';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Button, Input, Modal, Select } from '@oxygen/ui-kit';

import { addServerModalSchema } from '../../../../types';
import { ADDSERVERMODAL_FORM_ITEM } from '../../../../utils/consts';

import * as S from './add-server-modal.style';

export type AddServerModalPropsType = {
  isOpen: boolean;
  toggle: () => void;
};
export const AddServerModal: React.FC<AddServerModalPropsType> = (props) => {
  const { isOpen, toggle } = props;

  const [t] = useTr();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    console.log('submit');
    toggle();
  };

  const rule = createSchemaFieldRule(addServerModalSchema(t));

  return (
    <Modal
      centered
      title={t('add_server')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <S.SubmitBtn onClick={() => form.submit()} size='large' color='primary' variant='solid'>
          {t(`upstream_tab.submit_server`)}
        </S.SubmitBtn>,
      ]}
    >
      <Form onFinish={handleSubmit} name={ADDSERVERMODAL_FORM_ITEM.ADD_SERVER} form={form}>
        <S.FormContainer>
          <Form.Item name={ADDSERVERMODAL_FORM_ITEM.IP_PORT} label={t('upstream_tab.modal.ip_port')} rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item name={ADDSERVERMODAL_FORM_ITEM.WEIGHT} label={t('upstream_tab.modal.weight')} rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item name={ADDSERVERMODAL_FORM_ITEM.HEALTH} label={t('upstream_tab.modal.health')}>
            <Select options={[]} />
          </Form.Item>
        </S.FormContainer>
      </Form>
    </Modal>
  );
};
