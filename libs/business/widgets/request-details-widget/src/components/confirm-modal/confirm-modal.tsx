import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import { useTheme } from 'styled-components';
import { createSchemaFieldRule } from 'antd-zod';

import { Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';

import { PanelType, type RequestConfirmType, requestConfirmType, RequestId } from '../../types';
import ConfirmStatusModal from '../confirm-status-modal/confirm-status-modal';
import { CONFIRM_MODAL_NAMES } from '../../utils/consts';
import { useAppState } from '../../context';

import * as S from './confirm-modal.style';

type Props = {
  openModal: boolean;
  requestId: RequestId;
  confirmLoading: boolean;
  clientName: string;
  organizationName: string;
  isConfirm?: boolean;
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

  const updateCachedResult = (requestId) => {
    const statusKey = userRole === PanelType.BUSINESS_BANKING ? 'businessBankingStatus' : 'businessUnitStatus';
    const statusUpdate = isConfirm
      ? {
          code: userRole === PanelType.BUSINESS_BANKING ? '02' : '03',
          title: userRole === PanelType.BUSINESS_BANKING ? 'تایید اولیه' : 'تایید نهایی',
        }
      : { code: '04', title: 'رد درخواست' };

    queryClient.setQueryData([RQKEYS.REQUEST_DETAILS.GET_REQUEST_INFO, { requestId }], (oldData: any) => {
      if (!oldData) return;

      return {
        ...oldData,
        requestGeneralInfo: {
          requestStatus: {
            ...oldData.requestGeneralInfo.requestStatus,
            [statusKey]: statusUpdate,
          },
        },
      };
    });
  };

  const clientNameRef = useRef(clientName);
  const organizationNameRef = useRef(organizationName);

  useEffect(() => {
    clientNameRef.current = clientName;
    organizationNameRef.current = organizationName;
  }, [clientName, organizationName]);

  const handleOk = (requestId) => {
    setConfirmLoading(true);
    form.submit();
    updateCachedResult(requestId);
    if (userRole === PanelType.BUSINESS && isConfirm) {
      setTimeout(() => {
        setOpenModal(false);
        setConfirmLoading(false);
      }, 1500);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleFinish = (values) => {
    setTimeout(() => {
      form.resetFields();
      setOpenModal(false);
      if (userRole === PanelType.BUSINESS_BANKING) {
        setOpenStatus(true);
      }
      setConfirmLoading(false);
    }, 1500);
  };

  const showForm = userRole === PanelType.BUSINESS_BANKING || (userRole === PanelType.BUSINESS && !isConfirm);

  const ModalForm = ({ form, onFinish, rule, t, isConfirm }) => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name={CONFIRM_MODAL_NAMES.confirmDescription} rules={[rule]}>
        <S.StyledTextarea
          showCount={{
            formatter: ({ count, maxLength }) => (
              <span
                style={{
                  position: 'absolute',
                  bottom: 35,
                  [t.direction === 'rtl' ? 'left' : 'right']: t.direction === 'rtl' ? 5 : -50,
                }}
              >
                {count}/{maxLength}
              </span>
            ),
          }}
          rows={6}
          maxLength={150}
          placeholder={t(isConfirm ? 'description' : 'reject_reason')}
        />
      </Form.Item>
    </Form>
  );

  const ModalMessage = ({ t, isConfirm, clientName, organizationName }) => (
    <S.ModalMessage>
      {t('confirm_question_first')}
      <S.ClientName>{` "${clientName}" `}</S.ClientName>
      {t(isConfirm ? 'confirm_question_second' : 'reject_question_second', { organizationName: organizationName })}
    </S.ModalMessage>
  );

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
              <ModalMessage
                t={t}
                isConfirm={isConfirm}
                clientName={clientNameRef.current}
                organizationName={organizationNameRef.current}
              />
              <ModalForm form={form} onFinish={handleFinish} rule={rule} t={t} isConfirm={isConfirm} />
            </>
          ) : (
            <S.ModalMessage>{t('confirm_question_business', { clientName })}</S.ModalMessage>
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
