import React, { useState } from 'react';

import { Card, Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import {
  Box,
  Button,
  Chip,
  Divider,
  Input,
  SearchItemsContainer,
  Select,
  Switch,
  Dropdown,
  MenuItemType,
} from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  setCurrentStep: any;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();
  const [grantTags, setGrantTags] = useState([]);
  const [nameTags, setNameTags] = useState([]);

  const dropdownOptions: MenuItemType[] = [
    { label: 'Client Flow', key: 'option1' },
    { label: 'Password Flow', key: 'option2' },
    { label: 'Implicit Flow', key: 'option4' },
    { label: 'Refresh Token', key: 'option5' },
    { label: 'Client Flow', key: 'option6' },
    { label: 'Password Flow', key: 'option7' },
    { label: 'Authorization Code Flow', key: 'option8' },
  ];
  const FormItem = {
    latin_name_client: 'latin-name-client',
    persian_name_client: 'persian_name_client',
    client_type: 'client_type',
    client_id: 'client_id',
    identity_auth: 'identity_auth',
    website_url: 'website_url',
    input_address: 'input_address',
    return_address: 'return_address',
    aggregator_status: 'aggregator_status',
    aggregator: 'aggregator',
    user_name: 'user_name',
    national_code: 'national_code',
    organization_name: 'organization_name',
    mobile_number: 'mobile_number',
    telephone: 'telephone',
    email: 'email',
  };

  const handleGrantChange = (values) => {
    setGrantTags(values);
  };
  const handleNameChange = (values) => {
    setNameTags(values);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleChipClose = (key) => {
    setGrantTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };

  const handleSubmit = () => {
    form.submit();
    setCurrentStep((prev) => prev + 1);
  };
  form.setFieldValue('grant-tag', grantTags);
  form.setFieldValue('add-tag', nameTags);
  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FirstForm>
          <Box>
            <Form.Item className={'tag-input-grant-tag'} name={'grant-tag'}>
              <Dropdown.Select
                multiSelect={true}
                defaultValue={grantTags}
                menu={dropdownOptions}
                onChange={handleGrantChange}
                loading={false}
              >
                {t('form.grant_type')}
              </Dropdown.Select>
            </Form.Item>
            <div>
              {grantTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleChipClose(tag.key)}>
                  {tag.label}
                </Chip>
              ))}
            </div>
          </Box>
          <Box>
            <Form.Item className={'tag-input-grant-tag'} name={'add-tag'}>
              <Dropdown.Select
                multiSelect={true}
                defaultValue={nameTags}
                menu={dropdownOptions}
                onChange={handleNameChange}
                loading={false}
              >
                {t('form.add_tags')}
              </Dropdown.Select>
            </Form.Item>
            <div>
              {nameTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleChipClose(tag.key)}>
                  {tag.label}
                </Chip>
              ))}
            </div>
          </Box>
        </S.FirstForm>
        <p className={'cards-title'}>{t('client_info')}</p>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={FormItem.latin_name_client}
              label={t('form.latin_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} size='large' />
            </Form.Item>

            <Form.Item
              name={FormItem.persian_name_client}
              label={t('form.persian_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.client_type}
              label={t('form.client_type')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Select size={'large'} placeholder={'...'}></Select>
            </Form.Item>
            <Form.Item
              name={FormItem.client_id}
              label={t('form.client_id')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.identity_auth}
              label={t('form.identity_auth')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.website_url} label={t('form.website_url')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.input_address}
              label={t('form.input_address')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.return_address}
              label={t('form.return_address')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.aggregator_status}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={FormItem.aggregator}
              label={t('form.aggregator')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Select size={'large'} placeholder={'...'}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <p className={'cards-title'}>{t('applicant_info')}</p>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={FormItem.user_name}
              label={t('form.user_name')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.national_code} label={t('form.national_code')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.organization_name}
              label={t('form.organization_name')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'}></Input>
            </Form.Item>
            <Form.Item
              name={FormItem.mobile_number}
              label={t('form.mobile_number')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.telephone} label={t('form.telephone')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.email} label={t('form.email')}>
              <Input placeholder={'...'} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
      </Form>
      <Divider className={'seperator'} />

      <div className={'footer'}>
        <Button variant={'outlined'}>بازگشت</Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          ثبت اطلاعات
          <i className={'icon-arrow-up'}></i>
        </Button>
      </div>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
