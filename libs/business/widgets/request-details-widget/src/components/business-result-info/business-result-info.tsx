import React from 'react';

import { InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { Review } from '../../types';

import * as S from '../commercial-result-info/commercial-result-info.style';

type Props = {
  result: Review;
};

const BusinessResultInfo: React.FC<Props> = (props: Props) => {
  const { result } = props;

  const [t] = useTr();

  const isConfirmed = result.expertOpinion?.code === 1;

  const businessResultInfo = [
    {
      key: t('contract_date'),
      value: getValueOrDash(result?.viewDate),
    },
    {
      key: t('description'),
      value: getValueOrDash(result?.expertDescription),
    },
  ];
  return (
    <S.InfoBoxContainer isConfirmed={isConfirmed}>
      <InfoBox data={businessResultInfo} />
    </S.InfoBoxContainer>
  );
};

export default BusinessResultInfo;
