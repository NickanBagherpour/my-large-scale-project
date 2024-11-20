import React, { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import Link from 'next/link';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './formContainer.style';

type FormContainerProps = PageProps & {
  children: ReactNode;
  title: string;
};

export const FormContainer = ({ children, title }: FormContainerProps) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.FormContainer>
      <S.FormBox>
        <S.FormTitle>{title}</S.FormTitle>
        <S.FormInputs>
          <S.Input
            // value={value}
            placeholder={t('national_code')}
            // onChange={(e) => setValue(e.target.value)}
          />
          <S.Input
            // value={value}
            placeholder={t('mobile_number')}
            // onChange={(e) => setValue(e.target.value)}
          />
          <S.Input
            // value={value}
            placeholder={t('national_id')}
            // onChange={(e) => setValue(e.target.value)}
          />
        </S.FormInputs>
        <S.FormInputs>
          <S.Input
            // value={value}
            placeholder={t('captcha_code')}
            // onChange={(e) => setValue(e.target.value)}
          />
        </S.FormInputs>
        <S.Button color='primary'>{t('confirm_and_continue')}</S.Button>
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

export default FormContainer;
