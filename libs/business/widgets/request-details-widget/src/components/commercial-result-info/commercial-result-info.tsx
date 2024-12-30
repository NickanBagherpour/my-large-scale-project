import React from 'react';

import { InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { RequestStatus, SubmissionDetailType } from '../../types';

import * as S from './commercial-result-info.style';

type Props = {
  resultType: number;
  result: SubmissionDetailType['commercialExpertDto'];
};

const CommercialResultInfo: React.FC<Props> = (props: Props) => {
  const { resultType, result } = props;

  const [t] = useTr();

  const isConfirmed = resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK;

  const commercialResultInfo = [
    {
      key: t('expert_name'),
      value: getValueOrDash(result?.fullName),
    },
    {
      key: t(isConfirmed ? 'result_confirm_reason' : 'result_reject_reason'),
      value: getValueOrDash(result?.description),
    },
    {
      key: t(isConfirmed ? 'result_confirm_date' : 'result_reject_date'),
      value: getValueOrDash(result?.opinionDate),
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      <InfoBox data={commercialResultInfo} />
    </S.InfoBoxContainer>
  );
};

export default CommercialResultInfo;
