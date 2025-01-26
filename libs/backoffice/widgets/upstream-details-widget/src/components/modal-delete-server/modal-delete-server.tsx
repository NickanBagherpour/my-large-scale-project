import React, { useState, useEffect } from 'react';

import { MutationStatus } from '@tanstack/react-query';
import { Divider, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';

import { CreateServerType } from './modal-delete-server.schema';
import { AnimatedStatus } from '@oxygen/reusable-components';
import {
  getDesktopColumnsDeleteServerModal,
  getMobileColumnsDeleteServerModal,
} from '../../utils/upstream-details-list-util';
import { UpstreamDetailsType } from '../../types';

import * as S from './modal-delete-server.style';

interface ReusableFormModalProps {
  title?: string;
  open: boolean;
  setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  status: MutationStatus;
  initialData?: CreateServerType;
  successMsg?: string;
  data?: UpstreamDetailsType[];
  okButtonProps: any;
  cancelButtonProps: any;
  okText: string;
  cancelText: string;
  centered: boolean;
  onOk: () => void;
}

const MainDeleteServerModal: React.FC<ReusableFormModalProps> = (props) => {
  const {
    title = 'add-upstream.create_upstream',
    open,
    setOpen,
    status,
    initialData,
    successMsg,
    data,
    cancelText,
    okText,
    okButtonProps,
    cancelButtonProps,
    centered,
    onOk,
  } = props;

  const [isCreateMode, setIsCreateMode] = useState(true);

  const [t] = useTr();

  const createStatus = {
    success: 'success',
    pending: 'loading',
    idle: 'loading',
    error: 'error',
  } as const;

  useEffect(() => {
    if (!initialData && open) {
      setIsCreateMode(true);
    }
  }, [open, initialData]);

  const resetModal = () => {
    setOpen(false);
    setIsCreateMode(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsCreateMode(true);
  };

  const handleConfirmDelete = () => {
    setIsCreateMode(false);
    onOk();
  };

  const desktopColumns = getDesktopColumnsDeleteServerModal({ t });
  const mobileColumns = getMobileColumnsDeleteServerModal({ t });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));

  const renderModalContent = () => {
    if (isCreateMode) {
      return (
        <>
          <S.StyledHeader>
            <S.StyledTitle>{t(title)}</S.StyledTitle>
            <S.StyledCloseIcon className={'icon-close-square'} onClick={resetModal} />
          </S.StyledHeader>
          <Divider />
          <S.StyledContainer>
            <S.ModalMessage>{t('are_you_sure_delete_server_question')}</S.ModalMessage>
            <S.TableContainer>
              <Table
                dataSource={tableData}
                columns={desktopColumns}
                mobileColumns={mobileColumns}
                hasContainer={false}
                pagination={false}
                rowKey={() => uuid()}
                showHeader
              />
            </S.TableContainer>
          </S.StyledContainer>
        </>
      );
    } else {
      return (
        <S.StyledContainer>
          <AnimatedStatus
            status={createStatus[status]}
            errorProps={{ description: t('uikit.error_description') }}
            loadingProps={{ description: t('uikit.loading_description') }}
            successProps={{ description: successMsg ? t(`${successMsg}`) : '' }}
          />
          {!initialData && status !== 'pending' && status !== 'success' && (
            <S.StyledButton icon={<i className={'icon-refresh'} />} onClick={() => setIsCreateMode(true)}>
              {t('button.try_again')}
            </S.StyledButton>
          )}
          {status !== 'pending' && (
            <S.StyledButton color={'primary'} variant={'outlined'} onClick={resetModal}>
              {t('button.return')}
            </S.StyledButton>
          )}
          {status === 'pending' && (
            <S.StyledButton color={'primary'} variant={'outlined'} onClick={resetModal}>
              {t('button.cancellation')}
            </S.StyledButton>
          )}
        </S.StyledContainer>
      );
    }
  };
  return (
    <S.StyledModal
      open={open}
      onCancel={handleCancel}
      confirmLoading={status === 'pending'}
      destroyOnClose={true}
      closeIcon={false}
      headerDivider={false}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      cancelText={cancelText}
      okText={okText}
      centered={centered}
      footer={!isCreateMode ? null : undefined}
      // onOk={onOk}
      onOk={handleConfirmDelete}
      keyboard={false}
    >
      {renderModalContent()}
    </S.StyledModal>
  );
};
export default MainDeleteServerModal;
