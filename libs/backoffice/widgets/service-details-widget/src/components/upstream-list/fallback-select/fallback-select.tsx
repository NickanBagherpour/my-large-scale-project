import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';

import { useTr } from '@oxygen/translation';

import { Card } from './selection/card/card';
import { RADIO_GROUP_NAME } from '../../../utils/consts';
import { useAppDispatch, useAppState } from '../../../context';
import { NameInputs } from './creation/name-inputs/name-inputs';
import { CardDetail } from './selection/card-detail/card-detail';
import { useUpstreamCardsDetailQuery } from '../../../services/upstream-tab/upstream-cards-detail';

import * as S from './fallback-select.style';
import { DataTable } from './creation/data-table/data-table';

export const FallbackSelect = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const { data, isFetching } = useUpstreamCardsDetailQuery({
    page: 0,
    size: 1,
    sort: ['asc'],
  });
  // const { data, isFetching } = useUpstreamCardsDetailsQuery();
  // console.log('data', state);

  return (
    <S.UpstreamCreationContainer>
      <S.BorderBox>
        <S.SelectContainer>
          <Card cardData={data?.content} loading={isFetching} />
        </S.SelectContainer>
      </S.BorderBox>
      {state.upstreamTab.activeSelect.cardId && <CardDetail />}
    </S.UpstreamCreationContainer>
  );
};
