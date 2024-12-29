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
      <div>AdvanceGridCard</div>
      <div>{children}</div>
      <Button variant='outlined' onClick={btnHandleClick}>
        {t('see_more')}
      </Button>
    </S.Container>
  );
};
