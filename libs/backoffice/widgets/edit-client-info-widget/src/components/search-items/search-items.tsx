import React from 'react';
import { Input, Select } from '@oxygen/ui-kit';
import { Form } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { CLIENT_NAME_LIMIT, GrantValue, TEXT_INPUT_LIMIT } from '../../utils/consts';

const SearchItems = ({ rule, t, clientTypes, isClientTypesFetching, loadingUpdateClient, isSuccess, form }) => {
  const selectedGrantTypes = Form.useWatch(FORM_ITEM_NAMES.grantType, form);

  const isSelected = selectedGrantTypes?.some(
    (grantType: { code: string; title: string }) => grantType.code === GrantValue[2].code
  );

  return (
    <>
      <Form.Item name={FORM_ITEM_NAMES.englishNameClient} label={t('form.english_name_client')} rules={[rule]}>
        <Input placeholder={t('placeholder.english_name_client')} maxLength={CLIENT_NAME_LIMIT} disabled />
      </Form.Item>
      <Form.Item name={FORM_ITEM_NAMES.persianNameClient} label={t('form.persian_name_client')} rules={[rule]}>
        <Input placeholder={t('placeholder.persian_name_client')} maxLength={CLIENT_NAME_LIMIT} />
      </Form.Item>
      <Form.Item name={FORM_ITEM_NAMES.clientId} rules={[rule]} label={t('form.client_id')}>
        <Input placeholder={t('placeholder.client_id')} maxLength={TEXT_INPUT_LIMIT} disabled />
      </Form.Item>
      <Form.Item name={FORM_ITEM_NAMES.clientType} rules={[rule]} label={t('form.client_type')}>
        <Select
          disabled={loadingUpdateClient || isSuccess}
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
      <Form.Item
        rules={[rule, { required: isSelected, message: t('validation.required') }]}
        name={FORM_ITEM_NAMES.returnAddress}
        label={t('form.return_address')}
        dependencies={[FORM_ITEM_NAMES.grantType]}
      >
        <Input placeholder={t('placeholder.return_address')} maxLength={TEXT_INPUT_LIMIT} />
      </Form.Item>
      <Form.Item
        rules={[rule]}
        name={FORM_ITEM_NAMES.description}
        label={t('form.description')}
        className={'half-width'}
      >
        <Input placeholder={t('placeholder.description')} maxLength={TEXT_INPUT_LIMIT} />
      </Form.Item>
    </>
  );
};

export default SearchItems;
