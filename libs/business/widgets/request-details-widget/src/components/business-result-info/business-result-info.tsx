import React from 'react';

import { InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { ExpertOpinionCode, Review } from '../../types';

import * as S from '../commercial-result-info/commercial-result-info.style';

type Props = {
  result: Review;
};

const BusinessResultInfo: React.FC<Props> = (props: Props) => {
  const { result } = props;

  const [t] = useTr();

  const isConfirmed = result.expertOpinion?.code === ExpertOpinionCode.APPROVED;

  const businessResultInfo = [
    {
      key: t('contract_date'),
      value: getValueOrDash(result?.viewDate),
    },
    {
      key: t(isConfirmed ? 'result_confirm_reason' : 'result_reject_reason'),
      value: getValueOrDash(result?.expertDescription),
    },
  ];
  return (
    <S.InfoBoxContainer $isConfirmed={isConfirmed}>
      <InfoBox data={businessResultInfo} />
    </S.InfoBoxContainer>
  );
};

export default BusinessResultInfo;
