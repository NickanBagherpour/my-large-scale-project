import React from 'react';

import * as S from './advance-grid-card.style';
import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

export type AdvanceGridCardPropsType = {
  children?: React.ReactNode;
  btnHandleClick: () => void;
};
export const AdvanceGridCard = (props: AdvanceGridCardPropsType) => {
  const { children, btnHandleClick } = props;
  //hooks
  const [t] = useTr();
  return (
    <S.Container>
      <S.Divider>
        <S.Details>alireza</S.Details>
        <S.Status>ghaffar</S.Status>
      </S.Divider>
      <S.Discription>its me</S.Discription>
      <S.Button variant='outlined' onClick={btnHandleClick}>
        {t('button.view_request')}
      </S.Button>
    </S.Container>
  );
};
