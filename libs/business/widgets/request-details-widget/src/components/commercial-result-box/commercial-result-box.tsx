import React from 'react';

import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';

import { useAppState } from '../../context';
import ConfirmModal from '../confirm-modal/confirm-modal';
import RequestResultInfo from '../request-result-Info/request-result-info';
import { UserRole, RequestStatus, SubmissionDetailType } from '../../types';

import * as S from '../request-result-box/request-result-box.style';

type Props = {
  data: SubmissionDetailType;
};

const CommercialResultBox: React.FC<Props> = ({ data }) => {
  const { commercialExpertDto, businessExpertDto } = data;

  const state = useAppState();
  const [t] = useTr();

  const resultType = commercialExpertDto.expertOpinion.code;

  return (
    <S.StyledContainer>
      <S.StyledTitle>{t('business_banking_result')}</S.StyledTitle>
      {resultType !== RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && (
        <RequestResultInfo
          section={UserRole.COMMERCIAL_BANKING_ADMIN}
          resultType={resultType}
          result={commercialExpertDto}
        />
      )}
      {resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && (
        <>
          <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
          <S.StyledBox>
            <Icons.IconTimer />
            {t('checking_request')}
            {/*//TODO inam az expertDto baayad begiram?*/}
          </S.StyledBox>
        </>
      )}
      {/*{resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && <ConfirmButtons/>}*/}
    </S.StyledContainer>
  );
};

export default CommercialResultBox;
