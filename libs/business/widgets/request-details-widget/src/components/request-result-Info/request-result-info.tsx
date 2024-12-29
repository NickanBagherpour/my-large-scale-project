import React from 'react';

import { NoResult } from '@oxygen/reusable-components';
import { InfoBox, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { useAppState } from '../../context';
import { RequestStatus, SubmissionDetailType, UserRole } from '../../types';
import { useGetRequestResultQuery } from '../../services/get-request-result';

import * as S from './request-result-info.style';

type Props = {
  resultType: number;
  section: UserRole;
  result: SubmissionDetailType['commercialExpertDto'] | SubmissionDetailType['businessExpertDto'];
};

const RequestResultInfo: React.FC<Props> = (props: Props) => {
  const { resultType, section, result } = props;

  const state = useAppState();
  const { userRole, submissionId } = state;

  const [t] = useTr();
  const { data, isFetching } = useGetRequestResultQuery(prepareParams());

  function prepareParams() {
    const params = {
      submissionId: submissionId,
    };

    return params;
  }

  if (isFetching) return <Loading />;
  if (!data) return <NoResult isLoading={false} />;

  const { business, commercial } = data;
  const isConfirmed =
    resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK || resultType === RequestStatus.APPROVED_BY_BUSINESS_UNIT;
  const showFinalApproval =
    resultType === RequestStatus.APPROVED_BY_BUSINESS_UNIT &&
    userRole === UserRole.BUSINESS_ADMIN &&
    section === UserRole.BUSINESS_ADMIN;
  // const showBusinessBankingResult = userRole === UserRole.COMMERCIAL || userRole === UserRole.BUSINESS && section === 'business-banking';

  const businessResultInfo = [
    {
      key: t('contract_date'),
      value: business?.contractDate,
    },
    {
      key: t('description'),
      value: business?.contractDescription,
    },
  ];

  const commercialResultInfo = [
    {
      key: t('expert_name'),
      value: commercial?.expertName,
    },
    {
      key: t(isConfirmed ? 'result_confirm_reason' : 'result_reject_reason'),
      value: commercial?.resultReason,
    },
    {
      key: t(isConfirmed ? 'result_confirm_date' : 'result_reject_date'),
      value: commercial?.resultDate,
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      {showFinalApproval ? <InfoBox data={businessResultInfo} /> : <InfoBox data={commercialResultInfo} />}
    </S.InfoBoxContainer>
  );
};

export default RequestResultInfo;
