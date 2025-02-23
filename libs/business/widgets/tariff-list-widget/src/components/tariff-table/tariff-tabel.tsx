import React from 'react';
import * as S from './tariff-tabel.style';
import { PageProps } from '@oxygen/types';
import { useAppDispatch, useAppState } from '../../context';
import { useTr } from '@oxygen/translation';

export type TariffTablePropsType = PageProps & {
  //
};

export const TariffTable: React.FC<TariffTablePropsType> = (props) => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  return (
    <S.TariffTableContainer>
      <h1>this is tariffTable section</h1>
    </S.TariffTableContainer>
  );
};
