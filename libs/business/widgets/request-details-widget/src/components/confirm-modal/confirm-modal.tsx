import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import { useTheme } from 'styled-components';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { dateLocale, getTodayDate, getValueOrDash } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';

import { ExpertOpinionStatus, PanelType, type RequestConfirmType, requestConfirmType, SubmissionId } from '../../types';
import ConfirmStatusResultModal from '../confirm-status-result-modal/confirm-status-result-modal';
import { CONFIRM_MODAL_NAMES } from '../../utils/consts';
import { useAppState } from '../../context';

import { usePostSubmissionResultMutation } from '../../services';

import * as S from './confirm-modal.style';

type Props = {
  openModal: boolean;
  submissionId: SubmissionId;
  clientName: string;
  organizationName: Nullable<string>;
  isConfirm?: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const ConfirmModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, submissionId, clientName, organizationName, isConfirm } = props;
  const state = useAppState();
  const [t] = useTr();
  const theme = useTheme();
  const [form] = Form.useForm<RequestConfirmType>();
  const rule = createSchemaFieldRule(requestConfirmType(t));
  const [openStatusResult, setOpenStatusResult] = useState(false);
  const userRole = state?.userRole;

  const { notification } = useApp();

  const { mutate, isPending } = usePostSubmissionResultMutation();

  const handleSubmissionConfirm = () => {
    const params = {
      submissionId: state?.submissionId,
      expertOpinion: isConfirm ? ExpertOpinionStatus.CONFIRMED : ExpertOpinionStatus.REJECTED,
      description: form.getFieldValue(CONFIRM_MODAL_NAMES.expertDescription),
    };

    mutate(params, {
      onSuccess: () => {
        if (userRole === PanelType.COMMERCIAL) {
          setOpenStatusResult(true);
        }
      },
    });
  };
  const clientNameRef = useRef(clientName);
  const organizationNameRef = useRef(organizationName);

  useEffect(() => {
    clientNameRef.current = clientName;
    organizationNameRef.current = organizationName;
  }, [clientName, organizationName]);

  const handleOk = (submissionId) => {
    form.submit();
    handleSubmissionConfirm();

    if (userRole === PanelType.BUSINESS && isConfirm) {
      setOpenModal(false);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleFinish = (values) => {
    form.resetFields();
    setOpenModal(false);
  };

  const showForm = userRole === PanelType.COMMERCIAL || (userRole === PanelType.BUSINESS && !isConfirm);

  const ModalForm = ({ form, onFinish, rule, t, isConfirm }) => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name={CONFIRM_MODAL_NAMES.expertDescription} rules={[rule]}>
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
          rows={8}
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
      {t(isConfirm ? 'confirm_question_second' : 'reject_question_second', {
        organizationName: getValueOrDash(organizationName),
      })}
    </S.ModalMessage>
  );

  return (
    <>
      <S.StyledModal
        title={t(isConfirm ? 'confirm_request' : 'reject_request')}
        open={openModal}
        onOk={() => handleOk(submissionId)}
        confirmLoading={isPending}
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
      <ConfirmStatusResultModal
        openStatus={openStatusResult}
        statusDate={getTodayDate()}
        isConfirmStatus={isConfirm}
        setOpenStatus={setOpenStatusResult}
      />
    </>
  );
};

export default ConfirmModal;
