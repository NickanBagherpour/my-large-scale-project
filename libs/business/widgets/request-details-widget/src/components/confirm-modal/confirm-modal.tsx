import { Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useTheme } from 'styled-components';

import * as S from './confirm-modal.style';
import { Form } from 'antd';
import { CONFIRM_MODAL_NAMES } from '../../utils/consts';
import { PanelType, type RequestConfirmType, requestConfirmType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import ConfirmStatusModal from '../confirm-status-modal/confirm-status-modal';
import React, { useState } from 'react';
import { useAppState } from '../../context';
import { RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';

type Props = {
  openModal: boolean;
  requestId: string;
  // confirmLoading: boolean;
  clientName: string;
  organizationName: string;
  isConfirm: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const ConfirmModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, requestId, clientName, organizationName, isConfirm } = props;
  const state = useAppState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [t] = useTr();
  const theme = useTheme();
  const [form] = Form.useForm<RequestConfirmType>();
  const rule = createSchemaFieldRule(requestConfirmType(t));
  const [openStatus, setOpenStatus] = useState(false);
  const userRole = state?.userRole;

  const updateCachedResult = () => {
    queryClient.setQueryData([RQKEYS.REQUEST_DETAILS.GET_REQUEST_INFO, { requestId }], (oldData) => {
      if (!oldData) return;
      return {
        ...oldData,
        requestGeneralInfo: {
          requestStatus: {
            businessBankingStatus: { code: '03', title: 'تایید نهایی' },
            businessUnitStatus: { code: '03', title: 'تایید نهایی' },
          },
        },
      };
    });
  };

  const handleOk = (requestId) => {
    setConfirmLoading(true);
    form.submit();
    updateCachedResult();
    if (userRole === PanelType.BUSINESS && isConfirm) {
      setTimeout(() => {
        setConfirmLoading(false);
        setOpenModal(false);
      }, 1500);
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const handleFinish = (values) => {
    setTimeout(() => {
      form.resetFields();
      setOpenModal(false);
      queryClient.setQueryData([RQKEYS.REQUEST_DETAILS.GET_REQUEST_INFO, { requestId }], (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          requestGeneralInfo: {
            requestStatus: {
              businessBankingStatus: { code: '03', title: 'تایید نهایی' },
              businessUnitStatus: { code: '04', title: 'رد درخواست' },
            },
          },
        };
      });
      if (userRole === PanelType.BUSINESS_BANKING) {
        setOpenStatus(true);
      }
      setConfirmLoading(false);
    }, 1500);
  };

  const showForm = userRole === PanelType.BUSINESS_BANKING || (userRole === PanelType.BUSINESS && !isConfirm);

  return (
    <>
      <S.StyledModal
        title={t(isConfirm ? 'confirm_request' : 'reject_request')}
        open={openModal}
        onOk={() => handleOk(requestId)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        headerDivider={true}
        centered
        cancelText={t('button.cancel')}
        okText={t(isConfirm ? 'confirm_request' : 'reject_request')}
        okButtonProps={{ style: { backgroundColor: isConfirm ? theme.success.main : theme.error.main } }}
        cancelButtonProps={{ style: { color: isConfirm ? theme.success.main : theme.error.main } }}
      >
        <S.ModalContent>
          {showForm ? (
            <>
              <S.ModalMessage>
                {t('confirm_question_first')}
                <S.ClientName>{` "${clientName}" `}</S.ClientName>
                {t('confirm_question_second', { organizationName: organizationName })}
              </S.ModalMessage>
              <Form form={form} onFinish={handleFinish}>
                <Form.Item name={CONFIRM_MODAL_NAMES.confirmDescription} rules={[rule]}>
                  <Input.TextArea rows={6} placeholder={t(isConfirm ? 'description' : 'reject_reason')} />
                </Form.Item>
              </Form>
            </>
          ) : (
            <S.ModalMessage>{t('confirm_question_business', { clientName: clientName })}</S.ModalMessage>
          )}
        </S.ModalContent>
      </S.StyledModal>
      <ConfirmStatusModal
        openStatus={openStatus}
        statusDate={'1403/04/11'}
        isConfirmStatus={isConfirm}
        setOpenStatus={setOpenStatus}
      />
    </>
  );
};

export default ConfirmModal;
