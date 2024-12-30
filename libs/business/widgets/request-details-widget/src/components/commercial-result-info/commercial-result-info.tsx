import React from 'react';

import { InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { Review } from '../../types';

import * as S from './commercial-result-info.style';

type Props = {
  result: Review;
};

const CommercialResultInfo: React.FC<Props> = (props: Props) => {
  const { result } = props;
  const [t] = useTr();

  const isConfirmed = result.expertOpinion?.code === 1;

  const commercialResultInfo = [
    {
      key: t('expert_name'),
      value: getValueOrDash(result?.expertName),
    },
    {
      key: t(isConfirmed ? 'result_confirm_reason' : 'result_reject_reason'),
      value: getValueOrDash(result?.expertDescription),
    },
    {
      key: t(isConfirmed ? 'result_confirm_date' : 'result_reject_date'),
      value: getValueOrDash(result?.viewDate),
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      <InfoBox data={commercialResultInfo} />
    </S.InfoBoxContainer>
  );
};

export default CommercialResultInfo;
