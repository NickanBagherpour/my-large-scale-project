import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './first-step.style';
import { Card, Form, Switch } from 'antd';
import { Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <S.FirtStepContainer>
      <p className={'cards-title'}>اطلاعات کلی کلاینت</p>
      <Form layout={'vertical'} onFinish={onFinish}>
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
              <Input placeholder={'کلاینت بله'} />
            </Form.Item>
            <Form.Item name={'validation-system'} label={t('form.client_type')}>
              <Select placeholder={'سامانه های اعتباردهی - اعتبارسنجی'}></Select>
            </Form.Item>
            <Form.Item name={'client-id'} label={t('form.client_id')}>
              <Input placeholder={'407af44d-f469-413d-81cf-469b21fa'} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Input placeholder={'کلاینت بله'} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Input placeholder={'کلاینت بله'} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Input placeholder={'کلاینت بله'} />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Input placeholder={'کلاینت بله'} />
            </Form.Item>
            <Form.Item layout={'horizontal'}>
              <Switch />
            </Form.Item>
            <Form.Item name={'persian-client-name'} label={t('form.persian_name_client')}>
              <Select placeholder={'سامانه های اعتباردهی - اعتبارسنجی'}></Select>
            </Form.Item>
            {/*<Button type='primary' htmlType={'submit'}>*/}
            {/*  تایید*/}
            {/*</Button>*/}
          </SearchItemsContainer>
        </Card>
      </Form>
    </S.FirtStepContainer>
  );
};

export default FirstStep;
