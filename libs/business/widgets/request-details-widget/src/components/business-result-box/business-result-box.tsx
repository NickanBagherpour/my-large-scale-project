import React from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import { Icons } from '@oxygen/ui-kit';

import { RequestStatus, Review } from '../../types';
import BusinessResultInfo from '../business-result-info/business-result-info';

import * as S from '../commercial-result-box/commercial-result-box.style';

type Props = {
  resultType?: number;
  review: Review;
  isReviewed?: boolean;
};

const BusinessResultBox: React.FC<Props> = (props) => {
  const { resultType, isReviewed, review } = props;

  const [t] = useTr();

  const showBusinessResultInfo =
    resultType === RequestStatus.APPROVED_BY_BUSINESS_UNIT || resultType === RequestStatus.REJECTED_BY_BUSINESS_UNIT;

  const renderBusinessUnitPart = () => {
    if (review && !review.expertOpinion)
      return (
        <>
          <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
          <NoResult isLoading={false} />
        </>
      );
    return (
      <>
        <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
        {resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && (
          <S.StyledBox>
            <Icons.IconTimer />
            {t('checking_request')}
          </S.StyledBox>
        )}

        {showBusinessResultInfo ? <BusinessResultInfo result={review} /> : <NoResult isLoading={false} />}
      </>
    );
  };
  return <>{renderBusinessUnitPart()}</>;
};

export default BusinessResultBox;
