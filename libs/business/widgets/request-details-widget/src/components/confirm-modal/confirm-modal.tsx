import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import { useTheme } from 'styled-components';
import { createSchemaFieldRule } from 'antd-zod';
import { useQueryClient } from '@tanstack/react-query';

import { useTr } from '@oxygen/translation';
import { getValueOrDash, RQKEYS } from '@oxygen/utils';

import {
  ExpertOpinionStatus,
  UserRole,
  type RequestConfirmType,
  requestConfirmType,
  SubmissionId,
  PostSubmissionReviewParamsType,
  SubmissionDetailType,
} from '../../types';
import ConfirmStatusResultModal from '../confirm-status-result-modal/confirm-status-result-modal';
import { CONFIRM_MODAL_NAMES } from '../../utils/consts';
import { useAppState } from '../../context';

import { usePostSubmissionResultMutation } from '../../services';

import * as S from './confirm-modal.style';

type Props = {
  openModal: boolean;
  submissionId: SubmissionId;
  data: SubmissionDetailType['submissionInfoDto'];
  isConfirm?: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const ConfirmModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, submissionId, isConfirm, data } = props;
  const { organizationName, clientName } = data;
  const state = useAppState();

  const [t] = useTr();
  const theme = useTheme();

  const [form] = Form.useForm<RequestConfirmType>();
  const rule = createSchemaFieldRule(requestConfirmType(t));

  const [openStatusResult, setOpenStatusResult] = useState(false);
  const userRole = state?.userRole;

  const { mutate, isPending } = usePostSubmissionResultMutation();
  const queryClient = useQueryClient();

  const handleSubmissionConfirm = () => {
    const params: PostSubmissionReviewParamsType = {
      submissionId: state?.submissionId,
      expertOpinion: isConfirm ? ExpertOpinionStatus.CONFIRMED : ExpertOpinionStatus.REJECTED,
      description: form.getFieldValue(CONFIRM_MODAL_NAMES.expertDescription),
    };

    mutate(params, {
      onSuccess: () => {
        if (userRole === UserRole.COMMERCIAL_BANKING_ADMIN) {
          setOpenStatusResult(true);
          queryClient.invalidateQueries({ queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL, submissionId] });
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

    if (userRole === UserRole.BUSINESS_ADMIN && isConfirm) {
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

  const showForm =
    userRole === UserRole.COMMERCIAL_BANKING_ADMIN || (userRole === UserRole.BUSINESS_ADMIN && !isConfirm);

  const ModalForm = ({ form, onFinish, rule, t, isConfirm }) => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name={CONFIRM_MODAL_NAMES.expertDescription} rules={[rule]}>
        <S.StyledTextarea
          showCount={{
            formatter: ({ count, maxLength }) => (
              <S.StyledCount>
                {' '}
                {count}/{maxLength}
              </S.StyledCount>
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
        isConfirmStatus={isConfirm}
        setOpenStatus={setOpenStatusResult}
      />
    </>
  );
};

export default ConfirmModal;
