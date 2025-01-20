import React from 'react';

import { AnimatedStatus } from '@oxygen/reusable-components';
import { MutationStatus } from '@tanstack/react-query';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import * as S from './confirm-status-result-modal.style';

type Props = {
  openStatus: boolean;
  isConfirmStatus?: boolean;
  setOpenStatus: (boolean) => void;
  reviewDate: string;
  status: MutationStatus;
};
const ConfirmStatusResultModal: React.FC<Props> = (props: Props) => {
  const { openStatus, isConfirmStatus, setOpenStatus, reviewDate, status } = props;
  const handleCancel = () => {
    setOpenStatus(false);
  };
  const [t] = useTr();
  const newStatus = status === 'success' && !isConfirmStatus ? 'rejectSuccess' : status;

  const createStatus = {
    success: 'success',
    pending: 'loading',
    idle: 'loading',
    error: 'error',
    rejectSuccess: 'error',
  } as const;

  return (
    <>
      <S.StyledModal
        open={openStatus}
        headerDivider={false}
        centered
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
      >
        <S.StyledContainer>
          <S.AnimationContainer style={{ width: '100%' }}>
            <AnimatedStatus
              status={createStatus[newStatus]}
              errorProps={{ description: t('status_reject_description', { statusDate: reviewDate }) }}
              successProps={{ description: t('status_confirm_description', { statusDate: reviewDate }) }}
              loadingProps={{ description: t('add_upstream.loading_description') }}
            />
          </S.AnimationContainer>
          <S.StyledButton
            href={ROUTES.BUSINESS.REQUEST_LIST}
            size={'large'}
            variant={'outlined'}
            icon={<i className={'icon-home-empty'} />}
            disabled={createStatus[newStatus] === 'loading'}
          >
            {t('requests_management')}
          </S.StyledButton>
        </S.StyledContainer>
      </S.StyledModal>
    </>
  );
};

export default ConfirmStatusResultModal;
