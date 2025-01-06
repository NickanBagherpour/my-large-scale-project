import React, { useEffect, useState } from 'react';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useQueryClient } from '@tanstack/react-query';

import { useTr } from '@oxygen/translation';
import { getValueOrDash, RQKEYS } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';

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
  const theme = useAppTheme();

  const [form] = Form.useForm<RequestConfirmType>();
  const rule = createSchemaFieldRule(requestConfirmType(t));

  const [openStatusResult, setOpenStatusResult] = useState(false);
  const userRole = state?.userRole;

  const { mutate, isPending, data: reviewData } = usePostSubmissionResultMutation();
  const queryClient = useQueryClient();

  const handleSubmissionConfirm = () => {
    const params: PostSubmissionReviewParamsType = {
      role: userRole,
      submissionId: state?.submissionId,
      expertOpinion: isConfirm ? ExpertOpinionStatus.CONFIRMED : ExpertOpinionStatus.REJECTED,
      description: form.getFieldValue(CONFIRM_MODAL_NAMES.expertDescription),
    };

    mutate(params, {
      onSuccess: async () => {
        if (userRole === UserRole.COMMERCIAL_BANKING_ADMIN) {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL, RQKEYS.REQUEST_LIST.REQUEST_MANAGEMENT],
          });
        }
        await queryClient.refetchQueries({ queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL] });
        await queryClient.refetchQueries({ queryKey: [RQKEYS.REQUEST_LIST.REQUEST_MANAGEMENT] });
        setOpenStatusResult(true);
      },
      // onError: async () => {
      //   await queryClient.invalidateQueries({
      //     queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL, RQKEYS.REQUEST_LIST.REQUEST_MANAGEMENT],
      //   });
      //   await queryClient.refetchQueries(  {queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL]});
      // },
    });
  };
  const [clientNameState, setClientNameState] = useState(clientName);
  const [organizationNameState, setOrganizationNameState] = useState(organizationName);

  useEffect(() => {
    setClientNameState(clientName);
    setOrganizationNameState(organizationName);
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
                clientName={clientNameState}
                organizationName={organizationNameState}
              />
              <ModalForm form={form} onFinish={handleFinish} rule={rule} t={t} isConfirm={isConfirm} />
            </>
          ) : (
            <S.ModalMessage>{t('confirm_question_business', { clientName: clientNameState })}</S.ModalMessage>
          )}
        </S.ModalContent>
      </S.StyledModal>
      <ConfirmStatusResultModal
        openStatus={openStatusResult}
        isConfirmStatus={isConfirm}
        reviewDate={reviewData?.data}
        setOpenStatus={setOpenStatusResult}
      />
    </>
  );
};

export default ConfirmModal;
