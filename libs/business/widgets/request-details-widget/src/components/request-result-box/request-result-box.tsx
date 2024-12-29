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

const RequestResultBox: React.FC<Props> = ({ data }) => {
  const { commercialExpertDto, businessExpertDto } = data;
  const { organizationName, clientName } = data.submissionInfoDto;

  const state = useAppState();
  const [t] = useTr();

  const userRole = state?.userRole;
  const submissionId = state?.submissionId;

  const [openModal, setOpenModal] = React.useState(false);
  const [isConfirm, setIsConfirm] = React.useState<boolean>();

  const handleConfirm = () => {
    setIsConfirm(true);
    setOpenModal(true);
  };

  const handleReject = () => {
    setIsConfirm(false);
    setOpenModal(true);
  };

  const getConfirmButtons = () => {
    return (
      <S.ButtonContainer>
        <S.RejectButton size={'large'} variant={'outlined'} onClick={handleReject}>
          {t('button.reject_request')}
        </S.RejectButton>
        <S.ConfirmButton size={'large'} variant={'outlined'} onClick={handleConfirm}>
          {t('button.confirm_request')}
        </S.ConfirmButton>
      </S.ButtonContainer>
    );
  };

  const renderBusinessPanel = () => {
    const commercialResultType = commercialExpertDto.expertOpinion.code;
    const businessResultType = businessExpertDto.expertOpinion.code;

    const showCommercialResult =
      commercialResultType !== RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK &&
      commercialResultType !== RequestStatus.UNDER_REVIEW_BUSINESS_UNIT;

    const showBusinessResult =
      businessResultType !== RequestStatus.UNDER_REVIEW_BUSINESS_UNIT &&
      businessResultType !== RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK &&
      businessResultType !== RequestStatus.APPROVED_BY_COMMERCIAL_BANK;

    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('business_banking_result')}</S.StyledTitle>
        {showCommercialResult && (
          <RequestResultInfo
            section={UserRole.COMMERCIAL_BANKING_ADMIN}
            resultType={commercialResultType}
            result={commercialExpertDto}
          />
        )}
        <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>;
        {showBusinessResult && (
          <RequestResultInfo
            section={UserRole.BUSINESS_ADMIN}
            resultType={businessResultType}
            result={businessExpertDto}
          />
        )}
        {businessResultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderCommercialPanel = () => {
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
        {resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderContent = () => {
    switch (userRole) {
      case UserRole.BUSINESS_ADMIN:
        return renderBusinessPanel();
      case UserRole.COMMERCIAL_BANKING_ADMIN:
        return renderCommercialPanel();
      default:
        return undefined;
    }
  };

  return (
    <>
      {renderContent()}
      {isConfirm && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          openModal={openModal}
          isConfirm={isConfirm}
          organizationName={organizationName}
          clientName={clientName}
          submissionId={submissionId}
        />
      )}
    </>
  );
};

export default RequestResultBox;
