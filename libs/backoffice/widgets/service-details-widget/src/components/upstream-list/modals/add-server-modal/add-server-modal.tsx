import { useState } from 'react';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Input, Modal, Select } from '@oxygen/ui-kit';

import { addServerModalSchema } from '../../../../types';
import { ADD_SERVER_MODAL_FORM_ITEM, MAX_LENGTH_INPUT } from '../../../../utils/consts';

import * as S from './add-server-modal.style';
import { updateFallbackServersAction, useAppDispatch } from '../../../../context';

export type AddServerModalPropsType = {
  isOpen: boolean;
  toggle: () => void;
};

export const AddServerModal: React.FC<AddServerModalPropsType> = (props) => {
  const { isOpen, toggle } = props;

  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    updateFallbackServersAction(dispatch, values);
    console.log('submit', values);
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
      <Form onFinish={onFinish} name={ADD_SERVER_MODAL_FORM_ITEM.ADD_SERVER} form={form}>
        <S.FormContainer>
          <Form.Item name={ADD_SERVER_MODAL_FORM_ITEM.DOMAIN} label={t('upstream_tab.modal.ip_port')} rules={[rule]}>
            <Input maxLength={MAX_LENGTH_INPUT} />
          </Form.Item>
          <Form.Item name={ADD_SERVER_MODAL_FORM_ITEM.WEIGHT} label={t('upstream_tab.modal.weight')} rules={[rule]}>
            <Input maxLength={MAX_LENGTH_INPUT} />
          </Form.Item>
          <Form.Item name={ADD_SERVER_MODAL_FORM_ITEM.HEALTH} label={t('upstream_tab.modal.health')}>
            <Select options={[]} />
          </Form.Item>
        </S.FormContainer>
      </Form>
    </Modal>
  );
};
