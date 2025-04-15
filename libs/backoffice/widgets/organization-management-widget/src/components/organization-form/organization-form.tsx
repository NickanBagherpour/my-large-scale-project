import React from 'react';

import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './organization-form.styel';

export const OrganizationForm = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  return <S.OrganizationFormContainer>OrganizationForm</S.OrganizationFormContainer>;
};
