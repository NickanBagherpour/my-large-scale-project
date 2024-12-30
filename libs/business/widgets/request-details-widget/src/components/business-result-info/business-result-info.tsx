import React from 'react';

import { InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { RequestStatus, SubmissionDetailType } from '../../types';

import * as S from './business-result-info.style';

type Props = {
  resultType: number;
  result: SubmissionDetailType['businessExpertDto'];
};

const BusinessResultInfo: React.FC<Props> = (props: Props) => {
  const { resultType, result } = props;

  const [t] = useTr();

  const isConfirmed = resultType === RequestStatus.APPROVED_BY_BUSINESS_UNIT;

  const businessResultInfo = [
    {
      key: t('contract_date'),
      value: getValueOrDash(result?.opinionDate),
    },
    {
      key: t('description'),
      value: getValueOrDash(result?.description),
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      <InfoBox data={businessResultInfo} />
    </S.InfoBoxContainer>
  );
};

export default BusinessResultInfo;
