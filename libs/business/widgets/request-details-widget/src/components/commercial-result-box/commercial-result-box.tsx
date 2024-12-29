import React from 'react';

import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';

import { RequestStatus, SubmissionDetailType } from '../../types';
import CommercialResultInfo from '../commercial-result-info/commercial-result-info';

import * as S from '../commercial-result-box/commercial-result-box.style';
import { NoResult } from '@oxygen/reusable-components';

type Props = {
  data: SubmissionDetailType;
  getConfirmButtons: React.ReactNode;
};

const CommercialResultBox: React.FC<Props> = (props) => {
  const { data, getConfirmButtons } = props;
  const { commercialExpertDto, submissionInfoDto } = data;

  const [t] = useTr();

  const resultType = submissionInfoDto.submissionStatus.code;
  if (!commercialExpertDto) {
    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
        <NoResult isLoading={false} />
      </S.StyledContainer>
    );
  }
  return (
    <S.StyledContainer>
      <S.StyledTitle>{t('commercial_banking_result')}</S.StyledTitle>
      {resultType !== RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && (
        <CommercialResultInfo resultType={resultType} result={commercialExpertDto} />
      )}
      {resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && (
        <>
          <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
          <S.StyledBox>
            <Icons.IconTimer />
            {t('checking_request')}
          </S.StyledBox>
        </>
      )}
      {resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && getConfirmButtons}
    </S.StyledContainer>
  );
};

export default CommercialResultBox;
