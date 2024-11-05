import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { useAppDispatch, useAppState } from '../../context';
import { dropdownOptions, FormItem, selectOptions } from '../../utils/consts';

import * as S from './first-step.style';
import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';
import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
import { useSelectDataQuery } from '../../services/first-step/get-select-data';

type FirstStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [form] = Form.useForm();

  const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  const { data: selectData, isFetching: selectFetching } = useSelectDataQuery();

  const [grantTags, setGrantTags] = useState([]);
  const [nameTags, setNameTags] = useState([]);

  const rule = createSchemaFieldRule(createFormSchema(t));

  const handleGrantTagChange = (values) => {
    setGrantTags(values);
  };
  const handleNameTagChange = (values) => {
    setNameTags(values);
  };

  const onFinish = (values) => {
    console.log('this is on finish:', values);
    setCurrentStep((perv) => perv + 1);
  };

  const handleGrantChipClose = (key) => {
    setGrantTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };
  const handleNameChipClose = (key) => {
    setNameTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };
  const handleReturn = () => {
    router.back();
  };

  form.setFieldValue('grant-tag', grantTags);
  form.setFieldValue('add-tag', nameTags);
  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FirstForm>
          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={'grant-tag'}>
              <S.Select
                multiSelect={true}
                defaultValue={grantTags}
                menu={grantTagData}
                onChange={handleGrantTagChange}
                loading={grantTagFetching}
              >
                {t('form.grant_type')}
              </S.Select>
            </Form.Item>
            <div>
              {grantTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleGrantChipClose(tag.key)}>
                  {tag.label}
                </Chip>
              ))}
            </div>
          </S.TagPicker>

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={'add-tag'}>
              <S.Select
                multiSelect={true}
                defaultValue={nameTags}
                menu={NameTagData}
                onChange={handleNameTagChange}
                loading={nameTagFetching}
              >
                {t('form.add_tags')}
              </S.Select>
            </Form.Item>
            <div>
              {nameTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleNameChipClose(tag.key)}>
                  {tag.label}
                </Chip>
              ))}
            </div>
          </S.TagPicker>
        </S.FirstForm>
        <S.TitleTxt className={'cards-title'}>{t('client_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FormItem.latin_name_client} label={t('form.latin_name_client')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.latin_name_client')}`} />
            </Form.Item>

            <Form.Item name={FormItem.persian_name_client} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.farsi_name_client')}`} />
            </Form.Item>
            <Form.Item name={FormItem.client_type} label={t('form.client_type')} rules={[rule]}>
              <Select
                size={'large'}
                options={selectData}
                loading={selectFetching}
                placeholder={`${t('placeholder.client_type')}`}
              ></Select>
            </Form.Item>
            <Form.Item name={FormItem.client_id} label={t('form.client_id')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.client_id')}`} />
            </Form.Item>
            <Form.Item name={FormItem.identity_auth} label={t('form.identity_auth')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.authentication_id')}`} />
            </Form.Item>
            <Form.Item name={FormItem.website_url} label={t('form.website_url')}>
              <Input placeholder={`${t('placeholder.website_address')}`} />
            </Form.Item>
            <Form.Item name={FormItem.input_address} label={t('form.input_address')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.input_address')}`} />
            </Form.Item>
            <Form.Item name={FormItem.return_address} label={t('form.return_address')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.return_address')}`} />
            </Form.Item>
            <Form.Item
              name={FormItem.aggregator_status}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
            >
              <Switch />
            </Form.Item>
            <Form.Item name={FormItem.aggregator} label={t('form.aggregator')} rules={[rule]}>
              <Select
                size={'large'}
                options={selectData}
                loading={selectFetching}
                placeholder={`${t('placeholder.Aggregator')}`}
              ></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('applicant_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FormItem.user_name} label={t('form.user_name')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.user_name')}`} />
            </Form.Item>
            <Form.Item name={FormItem.national_code} label={t('form.national_code')}>
              <Input placeholder={`${t('placeholder.national_code')}`} />
            </Form.Item>
            <Form.Item name={FormItem.organization_name} label={t('form.organization_name')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.organization_name')}`}></Input>
            </Form.Item>
            <Form.Item name={FormItem.mobile_number} label={t('form.mobile_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.mobile_number')}`} />
            </Form.Item>
            <Form.Item name={FormItem.telephone} label={t('form.telephone')}>
              <Input placeholder={`${t('placeholder.telephone')}`} />
            </Form.Item>
            <Form.Item name={FormItem.email} label={t('form.email')}>
              <Input placeholder={`${t('placeholder.email')}`} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
      </Form>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={form.submit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
