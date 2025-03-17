'use client';

import type React from 'react';
import * as S from './redoc-wrapper.style';

export function RedocWrapper({ children }: { children: React.ReactNode }) {
  return (
    <S.StyledRedocContainer>
      <S.RedocGlobalStyles />
      {children}
    </S.StyledRedocContainer>
  );
}
