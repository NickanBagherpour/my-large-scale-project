import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';

import { useTr } from '@oxygen/translation';

import { Card } from './card/card';
import { CardDetail } from './card-detail/card-detail';
import { RADIO_GROUP_NAME } from '../../../utils/consts';
import { useAppDispatch, useAppState } from '../../../context';
import { useUpstreamCardsDetailsQuery } from '../../../services/upstream-tab/upstream-cards-detail';

import * as S from './upstream-creation.style';

export const UpstreamCreation = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState(RADIO_GROUP_NAME.SELECT);

  const { data, isFetching } = useUpstreamCardsDetailsQuery();

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <S.UpstreamCreationContainer>
      <S.BorderBox>
        <Radio.Group onChange={onRadioChange} value={value}>
          <Radio value={RADIO_GROUP_NAME.SELECT}>{t('upstream_tab.upstream_selection')}</Radio>
          <Radio value={RADIO_GROUP_NAME.CREATE}>{t('upstream_tab.create_upstream')}</Radio>
        </Radio.Group>
        <S.SelectContainer>
          {value === RADIO_GROUP_NAME.SELECT ? <Card cardData={data?.content} loading={isFetching} /> : <h1>reza</h1>}
        </S.SelectContainer>
      </S.BorderBox>
      {state.upstreamTab.cardId && <CardDetail />}
    </S.UpstreamCreationContainer>
  );
};
