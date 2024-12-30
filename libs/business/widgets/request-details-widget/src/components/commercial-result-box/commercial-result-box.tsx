import React from 'react';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { Review } from '../../types';
import CommercialResultInfo from '../commercial-result-info/commercial-result-info';

import * as S from '../commercial-result-box/commercial-result-box.style';

type Props = {
  resultType?: number;
  review: Review;
  isReviewed?: boolean;
};

const CommercialResultBox: React.FC<Props> = (props) => {
  const { resultType, isReviewed, review } = props;

  const [t] = useTr();

  if (isReviewed && !review?.expertOpinion)
    return (
      <>
        <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
        <NoResult isLoading={false} />
      </>
    );

  return (
    <>
      <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
      {review?.expertOpinion ? <CommercialResultInfo result={review} /> : <NoResult isLoading={false} />}
    </>
  );
};

export default CommercialResultBox;
