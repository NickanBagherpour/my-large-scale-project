import React, { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import Link from 'next/link';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useAppDispatch, useAppState } from '../../context';
import { Input } from '@oxygen/ui-kit';

import * as S from './register.style';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';

type FormContainerProps = PageProps & {
  children?: ReactNode;
  title: string;
};

export const Register = ({ children, title }: FormContainerProps) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [modalForm] = Form.useForm();

  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleFinish = (values: any) => {
    console.log(':)', values);
  };

  return (
    <S.FormContainer>
      <S.FormBox>
        <S.FormTitle>{title}</S.FormTitle>
        <Form layout={'vertical'} style={{ width: '100%' }} form={modalForm} onFinish={handleFinish}>
          <S.FormInputs>
            <Form.Item name={FORM_ITEM_NAMES.national_code} rules={[rule]}>
              <Input placeholder={t('national_code')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.mobile_number} rules={[rule]}>
              <Input placeholder={t('mobile_number')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.national_id} rules={[rule]}>
              <Input placeholder={t('national_id')} />
            </Form.Item>
          </S.FormInputs>
          <S.FormInputs>
            <Form.Item name={FORM_ITEM_NAMES.captcha_code} rules={[rule]}>
              <Input
                suffix={
                  <span>
                    <i className='icon-search-normal' />
                  </span>
                }
                placeholder={t('captcha_code')}
              />
            </Form.Item>
          </S.FormInputs>
        </Form>
        <S.Button onClick={() => modalForm.submit()} color='primary'>
          {t('confirm_and_continue')}
        </S.Button>
        <S.Divider />
        <S.Span>
          {t('do_you_registered_already')}
          <Link href='#' target={'_blank'}>
            {' '}
            {t('login_to_portal')}
          </Link>
        </S.Span>
      </S.FormBox>
    </S.FormContainer>
  );
};

export default Register;
