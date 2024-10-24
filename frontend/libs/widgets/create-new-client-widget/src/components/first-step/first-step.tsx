import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './first-step.style';
import { Card, Form } from 'antd';
import { Box, Button, Chip, Divider, Input, SearchItemsContainer, Select, Switch, TagInput } from '@oxygen/ui-kit';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

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

  const onFinish = (values) => {
    console.log(values);
  };

  const [pouria, setPouria] = useState('');

  console.log(pouria);

  return (
    <S.FirtStepContainer>
      <p className={'cards-title'}>{t('client_info')}</p>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Box>
          <Form.Item className={'tag-input'}>
            <TagInput buttonCaption={t('form.grant_type')} options={['af', 'asdf']} multiSelect={true} />
          </Form.Item>
          <Box flexGrow={9} marginLeft={'1rem'}>
            <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-sun-fill'}></i>}>
              Client Flow
            </Chip>
          </Box>
        </Box>

        <Box>
          <Form.Item className={'tag-input'}>
            <TagInput buttonCaption={t('form.grant_type')} options={['af', 'asdf']} multiSelect={true} />
          </Form.Item>
          <Box flexGrow={9} marginLeft={'1rem'}>
            <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-sun-fill'}></i>}>
              Client Flow
            </Chip>
          </Box>
        </Box>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={FormItem.latin_name_client}
              label={t('form.latin_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'app-bale'} />
            </Form.Item>
            <Form.Item name={FormItem.persian_name_client} label={t('form.persian_name_client')}>
              <Input placeholder={t('placeholder.client_bale')} />
            </Form.Item>
            <Form.Item name={FormItem.client_type} label={t('form.client_type')}>
              <Select placeholder={t('placeholder.credit_system')}></Select>
            </Form.Item>
            <Form.Item name={FormItem.client_id} label={t('form.client_id')}>
              <Input placeholder={t('placeholder.client_id')} />
            </Form.Item>
            <Form.Item name={FormItem.identity_auth} label={t('form.identity_auth')}>
              <Input placeholder={t('placeholder.identity_auth')} />
            </Form.Item>
            <Form.Item name={FormItem.website_url} label={t('form.website_url')}>
              <Input placeholder={t('placeholder.website_url')} />
            </Form.Item>
            <Form.Item name={FormItem.input_address} label={t('form.input_address')}>
              <Input placeholder={t('placeholder.input_address')} />
            </Form.Item>
            <Form.Item name={FormItem.return_address} label={t('form.return_address')}>
              <Input placeholder={t('placeholder.return_address')} />
            </Form.Item>
            <Form.Item name={FormItem.aggregator_status} layout={'vertical'} label={t('form.aggregator_status')}>
              <Switch />
            </Form.Item>
            <Form.Item name={FormItem.aggregator} label={t('form.aggregator')}>
              <Select placeholder={t('placeholder.faraboom')}></Select>
            </Form.Item>
            {/*  تایید*/}
            {/*</Button>*/}
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
              <Input placeholder={t('placeholder.user_name')} />
            </Form.Item>
            <Form.Item name={FormItem.national_code} label={t('form.national_code')}>
              <Input placeholder={t('placeholder.national_code')} />
            </Form.Item>
            <Form.Item name={FormItem.organization_name} label={t('form.organization_name')}>
              <Input placeholder={t('placeholder.organization_name')}></Input>
            </Form.Item>
            <Form.Item name={FormItem.mobile_number} label={t('form.mobile_number')}>
              <Input placeholder={t('placeholder.mobile_number')} />
            </Form.Item>
            <Form.Item name={FormItem.telephone} label={t('form.telephone')}>
              <Input placeholder={t('placeholder.telephone')} />
            </Form.Item>
            <Form.Item name={FormItem.email} label={t('form.email')}>
              <Input placeholder={t('placeholder.email')} />
            </Form.Item>
            {/*<Button type='primary' htmlType={'submit'}>*/}
            {/*  تایید*/}
            {/*</Button>*/}
          </SearchItemsContainer>
        </Card>
      </Form>
      <Divider className={'seperator'} />
      {/*//Todo add footer button container */}
      <div className={'footer'}>
        <Button variant={'outlined'}>بازگشت</Button>
        <Button htmlType={'submit'} onClick={() => form.submit()}>
          ثبت اطلاعات
          <i className={'icon-sun-fill'}></i>
        </Button>
      </div>
    </S.FirtStepContainer>
  );
};

export default FirstStep;
