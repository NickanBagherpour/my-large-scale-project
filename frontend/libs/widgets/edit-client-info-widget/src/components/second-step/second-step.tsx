import React from 'react';
import { z } from 'zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
import { Form } from 'antd';
//import { useGetReportDataQuery } from '../../services';
import * as S from './second-step.style';

import { Button, Divider, Input, InputProps, SearchItemsContainer } from '@oxygen/ui-kit';
import { Control, Controller, useForm } from 'react-hook-form';

type FirstStepProps = PageProps & {
  //
};

type InputFieldProps = InputProps & {
  control: Control<any>;
  name: string;
};

const InputHookForm = (props: InputFieldProps) => {
  const { name, ...rest } = props;
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        return <Input {...field} {...rest} />;
      }}
    />
  );
};

const SecondStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const FormItem = {
    latin_name_client: 'latin_name_client',
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

  const formSchema = z.object({
    [FormItem.latin_name_client]: z.string(),
    [FormItem.persian_name_client]: z.string(),
    [FormItem.client_type]: z.string(),
    [FormItem.client_id]: z.string(),
    [FormItem.identity_auth]: z.string(),
    [FormItem.website_url]: z.string(),
    [FormItem.input_address]: z.string(),
    [FormItem.return_address]: z.string(),
    [FormItem.aggregator_status]: z.boolean().optional(),
    [FormItem.aggregator]: z.string(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const { handleSubmit, control, watch } = useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <S.FirtStepContainer>
      <div className={'form_wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <form
          onSubmit={handleSubmit((data) => {
            console.log('data ready to submit', data);
          })}
        >
          <SearchItemsContainer>
            <InputHookForm control={control} name={'first_name'} />
          </SearchItemsContainer>
          <div className={'footer'}>
            <Button variant={'outlined'}>{t('form.return')}</Button>
            <Button htmlType={'submit'} onClick={() => form.submit()}>
              {t('form.register_info')}
              <i className={'icon-arrow-left'}></i>
            </Button>
          </div>
        </form>
      </div>

      <Divider className={'seperator'} />
      {/*//Todo add footer button container */}
      {/*<div className={'footer'}>*/}
      {/*  <Button variant={'outlined'}>{t('form.return')}</Button>*/}
      {/*  <Button htmlType={'submit'} onClick={() => form.submit()}>*/}
      {/*    {t('form.register_info')}*/}
      {/*    <i className={'icon-arrow-left'}></i>*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </S.FirtStepContainer>
  );
};

export default SecondStep;
