import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Chip, Dropdown, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { createSchemaFieldRule } from 'antd-zod';

import { useAppDispatch, useAppState } from '../../context';

import { useGetGrantTypeQuery } from '../../services/get-grant-type.api';
import { useGetTags } from '../../services/get-tag-info.api';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { createFormSchema } from '../../types';

import * as S from './edit-client.style';

type FirstStepProps = PageProps & {
  //
  userData: any;
};

const EditClient: React.FC<FirstStepProps> = (props) => {
  const { userData } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(createFormSchema(t));

  const [grantTypeState, setGrantTypeState] = useState<{ key: string; label: string }[]>([]);

  const [tagsState, setTagsState] = useState<{ key: string; label: string }[]>([]);

  const { data: grantType, isFetching: isGrantTypeFetching } = useGetGrantTypeQuery();

  const { data: tags, isFetching: isTagsFetching } = useGetTags();

  const grantTypeData = grantType?.content;
  const tagsData = tags?.content;

  useEffect(() => {
    if (grantTypeData) {
      setGrantTypeState(userData.grantType);
    }
    if (tagsData) {
      setTagsState(userData.tags);
    }
  }, [grantTypeData, tagsData]);

  const defaultValues = {
    [FORM_ITEM_NAMES.clientStatus]: userData.clientStatus,
    [FORM_ITEM_NAMES.grantType]: userData.grantType,
    [FORM_ITEM_NAMES.tags]: userData.tags,
    [FORM_ITEM_NAMES.latinNameClient]: userData.latinNameClient,
    [FORM_ITEM_NAMES.persianNameClient]: userData.persianNameClient,
    [FORM_ITEM_NAMES.clientType]: userData.clientType,
    [FORM_ITEM_NAMES.clientId]: userData.clientId,
    [FORM_ITEM_NAMES.identityAuth]: userData.identityAuth,
    [FORM_ITEM_NAMES.websiteUrl]: userData.websiteUrl,
    [FORM_ITEM_NAMES.inputAddress]: userData.inputAddress,
    [FORM_ITEM_NAMES.returnAddress]: userData.returnAddress,
    [FORM_ITEM_NAMES.aggregatorStatus]: userData.aggregatorStatus,
    [FORM_ITEM_NAMES.aggregator]: userData.aggregator,
  };

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    console.log('hi', values);
  };

  const handleGrantTypeChange = (value) => {
    setGrantTypeState(value);
  };

  const handleTagsChange = (value) => {
    setTagsState(value);
  };

  const handleGrantTypeClose = (item) => {
    const updatedGrantTypes = grantTypeState.filter((grantType: any) => grantType.key !== item.key);
    console.log(updatedGrantTypes);
    setGrantTypeState(updatedGrantTypes);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.grantType]: updatedGrantTypes,
    });
  };

  const handleTagsClose = (option) => {
    const updatedTags = tagsState.filter((tag: any) => tag.key !== option.key);
    setTagsState(updatedTags);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.tags]: updatedTags,
    });
  };

  const clientType = [
    { value: 'TEST-1', label: 'TEST-1' },
    { value: 'TEST-2', label: 'TEST-2' },
    { value: 'TEST-3', label: 'TEST-3' },
  ];

  const aggregatorOption = [
    {
      value: 'test-1',
      label: 'test-1',
    },
    {
      value: 'test-2',
      label: 'test-2',
    },
  ];

  return (
    <S.EditClientContainer>
      <div className={'form_wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={defaultValues}>
          <Form.Item
            name={FORM_ITEM_NAMES.clientStatus}
            className={'label-switch'}
            layout={'horizontal'}
            label={t('form.client_status')}
          >
            <Switch />
          </Form.Item>
          <div className={'grid'}>
            <div className='item1'>
              <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.grantType}>
                <Dropdown.Select
                  loading={isGrantTypeFetching}
                  menu={grantTypeData}
                  multiSelect={true}
                  onChange={handleGrantTypeChange}
                >
                  {t('form.grant_type')}
                </Dropdown.Select>
              </Form.Item>
            </div>
            <span className={'line'}></span>
            <div className='item2'>
              {grantTypeState.map((item) => (
                <Chip
                  type={'active'}
                  key={item.key}
                  onClose={() => handleGrantTypeClose(item)}
                  className={'tags'}
                  closeIcon
                >
                  {item.label}
                </Chip>
              ))}
            </div>
          </div>
          <div className={'grid'}>
            <div className='item1'>
              <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.tags} className={'drop_down_input'}>
                <Dropdown.Select
                  loading={isTagsFetching}
                  menu={tagsData}
                  multiSelect={true}
                  onChange={handleTagsChange}
                >
                  {t('form.add_tags')}
                </Dropdown.Select>
              </Form.Item>
            </div>
            <span className={'line'}></span>
            <div className='item2'>
              {tagsState.map((item) => (
                <Chip type={'active'} key={item.key} onClose={() => handleTagsClose(item)} className={'tags'} closeIcon>
                  {item.label}
                </Chip>
              ))}
            </div>
          </div>

          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.latinNameClient} label={t('form.latin_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.latin_name_client')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.persianNameClient} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.client_bale')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientType} rules={[rule]} label={t('form.client_type')}>
              <Select size={'large'} placeholder={t('placeholder.credit_system')} options={aggregatorOption}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientId} rules={[rule]} label={t('form.client_id')}>
              <Input placeholder={t('placeholder.client_id')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.identityAuth} label={t('form.identity_auth')}>
              <Input placeholder={t('placeholder.identity_auth')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.websiteUrl} label={t('form.website_url')}>
              <Input placeholder={t('placeholder.website_url')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.inputAddress} label={t('form.input_address')}>
              <Input placeholder={t('placeholder.input_address')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.returnAddress} label={t('form.return_address')}>
              <Input placeholder={t('placeholder.return_address')} />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM_NAMES.aggregatorStatus}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
            >
              <Switch />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.aggregator} label={t('form.aggregator')}>
              <Select size={'large'} options={clientType} placeholder={t('placeholder.faraboom')}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <div className={'footer'}>
        <Button variant={'outlined'}>{t('form.return')}</Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('form.register_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </div>
    </S.EditClientContainer>
  );
};

export default EditClient;
