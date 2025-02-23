import React from 'react';
import * as S from './top-section.style';
import { PageProps } from '@oxygen/types';
type TopSectionPropsType = PageProps & {
  //
};
export const TopSection: React.FC<TopSectionPropsType> = (props) => {
  return <S.TopSectionContainer>top-section</S.TopSectionContainer>;
};
