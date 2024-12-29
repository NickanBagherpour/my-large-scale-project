import React from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';

import CommercialResultBox from '../commercial-result-box/commercial-result-box';
import BusinessResultBox from '../business-result-box/business-result-box';
import { UserRole, SubmissionDetailType } from '../../types';
import ConfirmModal from '../confirm-modal/confirm-modal';
import { useAppState } from '../../context';

import * as S from './request-result-box.style';

type Props = {
  data: SubmissionDetailType;
};

const RequestResultBox: React.FC<Props> = ({ data }) => {
  const { commercialExpertDto, businessExpertDto, submissionInfoDto } = data;

  const state = useAppState();
  const { userRole, submissionId } = state;

  const [t] = useTr();

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

  const getConfirmButtons = (
    <S.ButtonContainer>
      <S.RejectButton size={'large'} variant={'outlined'} onClick={handleReject}>
        {t('button.reject_request')}
      </S.RejectButton>
      <S.ConfirmButton size={'large'} variant={'outlined'} onClick={handleConfirm}>
        {t('button.confirm_request')}
      </S.ConfirmButton>
    </S.ButtonContainer>
  );

  const renderContent = () => {
    switch (userRole) {
      case UserRole.COMMERCIAL_BANKING_ADMIN:
        return <CommercialResultBox data={data} getConfirmButtons={getConfirmButtons} />;
      case UserRole.BUSINESS_ADMIN:
        return <BusinessResultBox data={data} getConfirmButtons={getConfirmButtons} />;
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
        data={submissionInfoDto}
        submissionId={submissionId}
      />
    </>
  );
};

export default RequestResultBox;
