import React from 'react';

import { InfoBox, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { useAppState } from '../../context';
import { PanelType, RequestStatus } from '../../types';
import { useGetRequestResultQuery } from '../../services/get-request-result';

import * as S from './request-result-info.style';

type Props = {
  resultType: string;
  section: PanelType;
};

const RequestResultInfo: React.FC<Props> = (props: Props) => {
  const { resultType, section } = props;

  const state = useAppState();
  const { userRole, requestId } = state;

  const [t] = useTr();
  const { data, isFetching } = useGetRequestResultQuery(prepareParams());

  function prepareParams() {
    const params = {
      requestId: requestId,
    };

    return params;
  }

  if (isFetching) return <Loading />;

  const { businessUnit, businessBanking } = data;
  const isConfirmed = resultType === RequestStatus.INITIAL_APPROVAL || resultType === RequestStatus.FINAL_APPROVAL;
  const showFinalApproval =
    resultType === RequestStatus.FINAL_APPROVAL && userRole === PanelType.BUSINESS && section === PanelType.BUSINESS;
  // const showBusinessBankingResult = userRole === PanelType.BUSINESS_BANKING || userRole === PanelType.BUSINESS && section === 'business-banking';

  const businessUnitResultInfo = [
    {
      key: t('contract_date'),
      value: businessUnit?.contractDate,
    },
    {
      key: t('description'),
      value: businessUnit?.contractDescription,
    },
  ];

  const businessBankingResultInfo = [
    {
      key: t('expert_name'),
      value: businessBanking?.expertName,
    },
    {
      key: t(isConfirmed ? 'result_confirm_reason' : 'result_reject_reason'),
      value: businessBanking?.resultReason,
    },
    {
      key: t(isConfirmed ? 'result_confirm_date' : 'result_reject_date'),
      value: businessBanking?.resultDate,
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      {showFinalApproval ? <InfoBox data={businessUnitResultInfo} /> : <InfoBox data={businessBankingResultInfo} />}
    </S.InfoBoxContainer>
  );
};

export default RequestResultInfo;
