import React, { useEffect, useState } from 'react';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useQueryClient } from '@tanstack/react-query';
import { useTr } from '@oxygen/translation';
import { getValueOrDash, RQKEYS } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';

import {
  ExpertOpinionStatus,
  UserRole,
  type RequestConfirmType,
  requestConfirmType,
  SubmissionId,
  PostSubmissionReviewParamsType,
} from '../../types';
import ConfirmStatusResultModal from '../confirm-status-result-modal/confirm-status-result-modal';
import { usePostSubmissionResultMutation } from '../../services';
import { CONFIRM_MODAL_NAMES } from '../../utils/consts';
import { useAppState } from '../../context';

import * as S from './confirm-modal.style';

type Props = {
  openModal: boolean;
  submissionId: SubmissionId;
  clientName?: Nullable<string>;
  aggregatorName?: Nullable<string>;
  isConfirm?: boolean;
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const ConfirmModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, submissionId, isConfirm, clientName, aggregatorName } = props;
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
      description: form.getFieldValue(CONFIRM_MODAL_NAMES.expertDescription) ?? '',
    };

    mutate(params, {
      onSuccess: async () => {
        if (userRole === UserRole.COMMERCIAL_BANKING_ADMIN) {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_DETAIL],
          });
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.REQUEST_LIST.REQUEST_MANAGEMENT],
          });
        }
      },
      onSettled: () => {
        setOpenModal(false);
        setOpenStatusResult(true);
      },
    });
  };
  const [clientNameState, setClientNameState] = useState<Nullable<string>>(clientName);
  const [aggregatorNameState, setAggregatorNameState] = useState<Nullable<string>>(aggregatorName);

  useEffect(() => {
    setClientNameState(clientName);
    setAggregatorNameState(aggregatorName);
  }, [clientName, aggregatorName]);

  const handleOk = (submissionId) => {
    form.submit();
    handleSubmissionConfirm();
  };
  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleFinish = (values) => {
    form.resetFields();
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
          style={{ resize: 'none' }}
        />
      </Form.Item>
    </Form>
  );

  const ModalMessage = ({ t, isConfirm, clientName, aggregatorName }) => {
    if (aggregatorName) {
      return (
        <S.ModalMessage>
          {t('confirm_question_first')}
          <S.ClientName>{` "${clientName}" `}</S.ClientName>
          {t(isConfirm ? 'confirm_question_second' : 'reject_question_second', {
            aggregatorName: getValueOrDash(aggregatorName),
          })}
        </S.ModalMessage>
      );
    } else {
      return (
        <S.ModalMessage>
          {t('confirm_question_first')}
          <S.ClientName>{` "${clientName}" `}</S.ClientName>
          {t(isConfirm ? 'confirm_question_no_aggregator' : 'reject_question_no_aggregator')}
        </S.ModalMessage>
      );
    }
  };

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
                aggregatorName={aggregatorNameState}
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
