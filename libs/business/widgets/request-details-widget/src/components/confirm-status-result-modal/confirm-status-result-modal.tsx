import React from 'react';
import Image from 'next/image';

import { Icons } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { dateLocale, ROUTES } from '@oxygen/utils';

import * as S from './confirm-status-result-modal.style';
import { Dayjs } from 'dayjs';

type Props = {
  openStatus: boolean;
  statusDate: Dayjs;
  isConfirmStatus?: boolean;
  setOpenStatus: (boolean) => void;
  //
};
const ConfirmStatusResultModal: React.FC<Props> = (props: Props) => {
  const { openStatus, statusDate, isConfirmStatus, setOpenStatus } = props;
  const handleCancel = () => {
    setOpenStatus(false);
  };
  const [t] = useTr();

  const date = dateLocale(statusDate['$d']);
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
          <S.StatusBox>
            <S.StyledIcon isConfirm={isConfirmStatus}>
              {isConfirmStatus ? (
                <i className={'icon-tick-circle'} />
              ) : (
                <Image src={Icons.iconWarningCircle} alt='warning circle icon' />
              )}
            </S.StyledIcon>
            <S.StyledDescription>
              {t(isConfirmStatus ? 'status_confirm_description' : 'status_reject_description', {
                statusDate: date,
              })}
            </S.StyledDescription>
          </S.StatusBox>
          <S.StyledButton
            href={ROUTES.BUSINESS.REQUESTS_MANAGEMENT}
            size={'large'}
            variant={'outlined'}
            icon={<i className={'icon-home'} />}
          >
            {t('requests_management')}
          </S.StyledButton>
        </S.StyledContainer>
      </S.StyledModal>
    </>
  );
};

export default ConfirmStatusResultModal;
