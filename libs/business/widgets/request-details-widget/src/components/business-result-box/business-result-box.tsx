import React from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';

import { RequestStatus, SubmissionDetailType } from '../../types';
import BusinessResultInfo from '../business-result-info/business-result-info';
import CommercialResultInfo from '../commercial-result-info/commercial-result-info';

import * as S from '../business-result-box/business-result-box.style';

type Props = {
  data: SubmissionDetailType;
  getConfirmButtons: React.ReactNode;
};

const BusinessResultBox: React.FC<Props> = (props) => {
  const { data, getConfirmButtons } = props;
  const { businessExpertDto, submissionInfoDto, commercialExpertDto } = data;

  const [t] = useTr();

  const resultType = submissionInfoDto.submissionStatus.code;
  const commercialResultType = RequestStatus.APPROVED_BY_COMMERCIAL_BANK;
  const showBusinessResultInfo =
    resultType === RequestStatus.APPROVED_BY_BUSINESS_UNIT || resultType === RequestStatus.REJECTED_BY_BUSINESS_UNIT;
  if (!commercialExpertDto && !businessExpertDto) {
    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
        <NoResult isLoading={false} />
        <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
        <NoResult isLoading={false} />
      </S.StyledContainer>
    );
  }

  return (
    <S.StyledContainer>
      <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
      {commercialExpertDto ? (
        <CommercialResultInfo resultType={commercialResultType} result={commercialExpertDto} />
      ) : (
        <NoResult isLoading={false} />
      )}

      <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
      {showBusinessResultInfo && businessExpertDto ? (
        <BusinessResultInfo resultType={resultType} result={businessExpertDto} />
      ) : (
        <NoResult isLoading={false} />
      )}
      {resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && businessExpertDto && getConfirmButtons}
    </S.StyledContainer>
  );
};

export default BusinessResultBox;
