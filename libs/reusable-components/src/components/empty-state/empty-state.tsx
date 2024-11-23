import React from 'react';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';

import emptyState from 'apps/customer-portal/public/assets/images/empty-state.png';

import * as S from './empty-state.style';

type Props = {
  description?: string;
} & React.ComponentProps<'div'>;

const EmptyState = (props: Props) => {
  const { description, ...rest } = props;
  const { t } = useTr();

  const displayDescription = description || t('no_result.there_is_no_data_to_show');

  return (
    <S.StyledContainer {...rest}>
      <S.ImgContainer>
        <Image
          priority
          fill
          src={emptyState}
          alt='Illustration representing an empty state'
          sizes='(min-width: 1200px) 20vw, (min-width: 768px) 30vw, 60vw'
        />
      </S.ImgContainer>
      <S.StyledText>{displayDescription}</S.StyledText>
    </S.StyledContainer>
  );
};

export default EmptyState;
