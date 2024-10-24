import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './first-step.style';
import { Card, Form } from 'antd';
import { Button, Divider, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';
import { FooterButtonContainer } from '@oxygen/reusable-components';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <S.FirtStepContainer>
      <p className={'cards-title'}>{t('client_info')}</p>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={'latin-name-client'}
              label={t('form.latin_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'app-bale'} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Input placeholder={t('placeholder.client_bale')} />
            </Form.Item>
            <Form.Item name={'validation-system'} label={t('form.client_type')}>
              <Select placeholder={t('placeholder.credit_system')}></Select>
            </Form.Item>
            <Form.Item name={'client-id'} label={t('form.client_id')}>
              <Input placeholder={t('placeholder.client_id')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.identity_auth')}>
              <Input placeholder={t('placeholder.identity_auth')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.website_url')}>
              <Input placeholder={t('placeholder.website_url')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.input_address')}>
              <Input placeholder={t('placeholder.input_address')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.return_address')}>
              <Input placeholder={t('placeholder.return_address')} />
            </Form.Item>
            <Form.Item layout={'vertical'} label={t('form.aggregator_status')}>
              <Switch />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.aggregator')}>
              <Select placeholder={t('placeholder.faraboom')}></Select>
            </Form.Item>
            {/*<Button type='primary' htmlType={'submit'}>*/}
            {/*  تایید*/}
            {/*</Button>*/}
          </SearchItemsContainer>
        </Card>
        <p className={'cards-title'}>{t('applicant_info')}</p>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={'latin-name-client'}
              label={t('form.user_name')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={t('placeholder.user_name')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.national_code')}>
              <Input placeholder={t('placeholder.national_code')} />
            </Form.Item>
            <Form.Item name={'validation-system'} label={t('form.organization_name')}>
              <Input placeholder={t('placeholder.organization_name')}></Input>
            </Form.Item>
            <Form.Item name={'client-id'} label={t('form.mobile_number')}>
              <Input placeholder={t('placeholder.mobile_number')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.telephone')}>
              <Input placeholder={t('placeholder.telephone')} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.email')}>
              <Input placeholder={t('placeholder.email')} />
            </Form.Item>
            {/*<Button type='primary' htmlType={'submit'}>*/}
            {/*  تایید*/}
            {/*</Button>*/}
          </SearchItemsContainer>
        </Card>
      </Form>
      <FooterButtonContainer>
        <Button htmlType={'submit'} onClick={() => form.submit()}>
          ثبت اطلاعات
          <i className={'icon-sun-fill'}></i>
        </Button>
        <Button variant={'outlined'}>بازگشت</Button>
      </FooterButtonContainer>
      <Divider />
    </S.FirtStepContainer>
  );
};

export default FirstStep;
