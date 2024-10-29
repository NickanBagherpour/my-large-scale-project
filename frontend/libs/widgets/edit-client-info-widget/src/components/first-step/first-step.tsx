import React, { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Chip, Dropdown, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import { useGetGrantTypeQuery } from '../../services/get-grant-type.api';
import { useGetTags } from '../../services/get-tag-info.api';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { rule } from '../../types';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const [grantTypeState, setGrantTypeState] = useState<any>([]);

  const [tagsState, setTagsState] = useState<any>([]);

  const { data: grantType, isFetching: isGrantTypeFetching } = useGetGrantTypeQuery();

  const { data: tags, isFetching: isTagsFetching } = useGetTags();

  const grantTypeData = grantType?.content ?? [];
  const tagsData = tags?.content ?? [];

  const submitClick = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    console.log(values);
  };

  const handleGrantTypeChange = (value) => {
    setGrantTypeState(value);
  };

  const handleTagsChange = (value) => {
    setTagsState(value);
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
    <S.FirtStepContainer>
      <div className={'form_wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
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
                <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-close style-icon'}></i>}>
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
                <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-close style-icon'}></i>}>
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
    </S.FirtStepContainer>
  );
};

export default FirstStep;
