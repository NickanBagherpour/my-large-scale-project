import React from 'react';

import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';
import { useApp } from '@oxygen/hooks';

import { useAppState } from '../../context';
import { PanelType, RequestStatus } from '../../types';
import ConfirmModal from '../confirm-modal/confirm-modal';
import RequestResultInfo from '../request-result-Info/request-result-info';

import * as S from '../request-result-box/request-result-box.style';

type Props = {
  data: any;
};

const RequestResultBox: React.FC<Props> = ({ data }) => {
  const { commercial, business } = data.submissionStatus;
  const { organizationName, clientName } = data.submissionInfoDto;
  const { notification } = useApp();
  const [t] = useTr();
  const state = useAppState();

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
    const commercialResultType = commercial?.code;
    const businessResultType = business?.code;
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
        {showCommercialResult && <RequestResultInfo section={PanelType.COMMERCIAL} resultType={commercialResultType} />}
        <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>;
        {showBusinessResult && <RequestResultInfo section={PanelType.BUSINESS} resultType={businessResultType} />}
        {businessResultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderBusinessBankingPanel = () => {
    const resultType = commercial?.code;

    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('business_banking_result')}</S.StyledTitle>
        {resultType !== RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && (
          <RequestResultInfo section={PanelType.COMMERCIAL} resultType={resultType} />
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
        {resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderContent = () => {
    switch (userRole) {
      case PanelType.BUSINESS:
        return renderBusinessPanel();
      case PanelType.COMMERCIAL:
        return renderBusinessBankingPanel();
      default:
        return undefined;
    }
  };

  return (
    <>
      {renderContent()}
      <ConfirmModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        isConfirm={isConfirm}
        organizationName={organizationName}
        clientName={clientName}
        submissionId={submissionId}
      />
    </>
  );
};

export default RequestResultBox;
