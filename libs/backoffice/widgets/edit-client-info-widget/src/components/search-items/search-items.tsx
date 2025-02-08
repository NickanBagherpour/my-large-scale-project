import React from 'react';
import { Input, Select } from '@oxygen/ui-kit';
import { Form } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { TEXT_INPUT_LIMIT } from '../../utils/consts';

const SearchItems = ({ rule, t, clientTypes, isClientTypesFetching, loadingUpdateClient, isSuccess }) => (
  <>
    <Form.Item name={FORM_ITEM_NAMES.latinNameClient} label={t('form.latin_name_client')} rules={[rule]}>
      <Input placeholder={t('placeholder.latin_name_client')} maxLength={TEXT_INPUT_LIMIT} disabled />
    </Form.Item>
    <Form.Item name={FORM_ITEM_NAMES.persianNameClient} label={t('form.persian_name_client')} rules={[rule]}>
      <Input placeholder={t('placeholder.client_bale')} maxLength={TEXT_INPUT_LIMIT} />
    </Form.Item>
    <Form.Item name={FORM_ITEM_NAMES.clientId} rules={[rule]} label={t('form.client_id')}>
      <Input placeholder={t('placeholder.client_id')} maxLength={TEXT_INPUT_LIMIT} disabled />
    </Form.Item>
    <Form.Item name={FORM_ITEM_NAMES.clientType} rules={[rule]} label={t('form.client_type')}>
      <Select
        disabled={loadingUpdateClient || isSuccess}
        defaultValue={null}
        loading={isClientTypesFetching}
        size={'large'}
        placeholder={t('placeholder.credit_system')}
        options={clientTypes}
      ></Select>
    </Form.Item>
    <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.identityAuth} label={t('form.identity_auth')}>
      <Input placeholder={t('placeholder.identity_auth')} maxLength={TEXT_INPUT_LIMIT} disabled />
    </Form.Item>
    <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.websiteUrl} label={t('form.website_url')}>
      <Input placeholder={t('placeholder.website_url')} maxLength={TEXT_INPUT_LIMIT} />
    </Form.Item>
    <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.inputAddress} label={t('form.input_address')}>
      <Input placeholder={t('placeholder.input_address')} maxLength={TEXT_INPUT_LIMIT} />
    </Form.Item>
    <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.returnAddress} label={t('form.return_address')}>
      <Input placeholder={t('placeholder.return_address')} maxLength={TEXT_INPUT_LIMIT} />
    </Form.Item>
  </>
);

export default SearchItems;
