import React from 'react';

import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';

import { useAppState } from '../../context';
import { PanelType, RequestStatus } from '../../types';
import ConfirmModal from '../confirm-modal/confirm-modal';
import RequestResultInfo from '../request-result-Info/request-result-info';

import * as S from '../request-result-box/request-result-box.style';

type Props = {
  requestData: any;
};

const RequestResultBox: React.FC<Props> = ({ requestData }) => {
  const { businessBankingStatus, businessUnitStatus } = requestData.requestStatus;
  const { organizationName, clientName } = requestData;

  const [t] = useTr();
  const state = useAppState();

  const userRole = state?.userRole;
  const requestId = state?.requestId;

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
    const bankingResultType = businessBankingStatus?.code;
    const unitResultType = businessUnitStatus?.code;

    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('business_banking_result')}</S.StyledTitle>
        {bankingResultType !== RequestStatus.PROCESS && (
          <RequestResultInfo section={PanelType.BUSINESS_BANKING} resultType={bankingResultType} />
        )}

        <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
        {unitResultType !== RequestStatus.PROCESS && unitResultType !== RequestStatus.INITIAL_APPROVAL && (
          <RequestResultInfo section={PanelType.BUSINESS} resultType={unitResultType} />
        )}
        {unitResultType === RequestStatus.INITIAL_APPROVAL && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderBusinessBankingPanel = () => {
    const resultType = businessBankingStatus?.code;
    return (
      <S.StyledContainer>
        <S.StyledTitle>{t('business_banking_result')}</S.StyledTitle>
        {resultType !== RequestStatus.PROCESS && (
          <RequestResultInfo section={PanelType.BUSINESS_BANKING} resultType={resultType} />
        )}
        {resultType === RequestStatus.INITIAL_APPROVAL && (
          <>
            <S.StyledTitle>{t('business_unit_result')}</S.StyledTitle>
            <S.StyledBox>
              <Icons.IconTimer />
              {t('checking_request')}
            </S.StyledBox>
          </>
        )}
        {resultType === RequestStatus.PROCESS && getConfirmButtons()}
      </S.StyledContainer>
    );
  };

  const renderContent = () => {
    switch (userRole) {
      case PanelType.BUSINESS:
        return renderBusinessPanel();
      case PanelType.BUSINESS_BANKING:
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
        confirmLoading={false}
        clientName={clientName}
        requestId={requestId}
      />
    </>
  );
};

export default RequestResultBox;
