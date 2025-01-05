import React from 'react';

import { NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { ExpertType, RequestStatus, Review, SubmissionDetailType, UserRole } from '../../types';
import CommercialResultInfo from '../commercial-result-info/commercial-result-info';
import { Icons } from '@oxygen/ui-kit';

import * as S from '../commercial-result-box/commercial-result-box.style';
import { useAppState } from '../../context';

type Props = {
  resultType?: number;
  review: Review;
  isReviewed?: boolean;
  allReviews: SubmissionDetailType['reviews'];
};

const CommercialResultBox: React.FC<Props> = (props) => {
  const { resultType, isReviewed, review, allReviews } = props;
  const [t] = useTr();
  const businessReviewAvailable = allReviews.find((review) => review.expertType === ExpertType.BUSINESS);
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
      {resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && !businessReviewAvailable && (
        <>
          <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
          <S.StyledBox>
            <Icons.IconTimer />
            {t('checking_request')}
          </S.StyledBox>
        </>
      )}
    </>
  );
};

export default CommercialResultBox;
