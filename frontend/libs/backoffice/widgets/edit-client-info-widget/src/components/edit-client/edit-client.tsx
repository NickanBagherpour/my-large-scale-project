import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer } from '@oxygen/reusable-components';

import { useAppDispatch, useAppState } from '../../context';

import { useGetGrantTypeQuery } from '../../services/get-grant-type.api';
import { useGetTags } from '../../services/get-tag-info.api';
import { createFormSchema } from '../../types';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { initialValues } from '../../utils/initial-values';
import { MAX_LENGTH } from '../../utils/consts';
import { ROUTES } from '@oxygen/utils';

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

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    // console.log('hi', values);
  };

  const handleGrantTypeChange = (value) => {
    setGrantTypeState(value);
  };

  const handleTagsChange = (value) => {
    setTagsState(value);
  };

  const handleGrantTypeClose = (item) => {
    const updatedGrantTypes = grantTypeState.filter((grantType: any) => grantType.key !== item.key);
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

  const shouldShowTooltip = (tag) => {
    return (
      <Chip
        key={tag.key}
        tooltipTitle={tag.label}
        ellipsis={true}
        tooltipOnEllipsis={true}
        type='active'
        closeIcon
        onClose={() => handleTagsClose(tag)}
      >
        <span> {tag.label}</span>
      </Chip>
    );
  };

  const clientType = [
    {
      value: '',
      label: t('select_aggre'),
    },
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
      <div className={'form-wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={initialValues(userData)}>
          <Form.Item
            name={FORM_ITEM_NAMES.clientStatus}
            className={'label-switch'}
            layout={'horizontal'}
            label={t('form.client_status')}
            colon={true}
          >
            <Switch />
          </Form.Item>

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM_NAMES.grantType}>
              <S.Select
                loading={isGrantTypeFetching}
                menu={grantTypeData}
                multiSelect={true}
                onChange={handleGrantTypeChange}
              >
                {t('form.grant_type')}
              </S.Select>
            </Form.Item>
            <div>{grantTypeState.map((tag: any) => shouldShowTooltip(tag))}</div>
          </S.TagPicker>

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM_NAMES.tags}>
              <S.Select loading={isTagsFetching} menu={tagsData} multiSelect={true} onChange={handleTagsChange}>
                {t('form.add_tags')}
              </S.Select>
            </Form.Item>
            <div>{tagsState.map((tag: any) => shouldShowTooltip(tag))}</div>
          </S.TagPicker>

          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.latinNameClient} label={t('form.latin_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.latin_name_client')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.persianNameClient} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.client_bale')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientType} rules={[rule]} label={t('form.client_type')}>
              <Select size={'large'} placeholder={t('placeholder.credit_system')} options={aggregatorOption}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientId} rules={[rule]} label={t('form.client_id')}>
              <Input placeholder={t('placeholder.client_id')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.identityAuth} label={t('form.identity_auth')}>
              <Input placeholder={t('placeholder.identity_auth')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.websiteUrl} label={t('form.website_url')}>
              <Input placeholder={t('placeholder.website_url')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.inputAddress} label={t('form.input_address')}>
              <Input placeholder={t('placeholder.input_address')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.returnAddress} label={t('form.return_address')}>
              <Input placeholder={t('placeholder.return_address')} maxLength={MAX_LENGTH} />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM_NAMES.aggregatorStatus}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
              colon={true}
            >
              <Switch />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.aggregator} label={t('form.aggregator')}>
              <Select size={'large'} options={clientType} placeholder={t('placeholder.aggregator')}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>

      <FooterContainer>
        <Button variant={'outlined'} href={ROUTES.BACKOFFICE.CLIENT_DETAILS}>
          {t('form.cancel')}
        </Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('form.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditClientContainer>
  );
};

export default EditClient;
