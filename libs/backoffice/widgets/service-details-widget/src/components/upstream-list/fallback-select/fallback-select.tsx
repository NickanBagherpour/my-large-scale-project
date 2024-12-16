import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';

import { useTr } from '@oxygen/translation';

import { Card } from './selection/card/card';
import { RADIO_GROUP_NAME } from '../../../utils/consts';
import { updateRadioValueAction, useAppDispatch, useAppState } from '../../../context';
import { NameInputs } from './creation/name-inputs/name-inputs';
import { CardDetail } from './selection/card-detail/card-detail';
import { useUpstreamCardsDetailsQuery } from '../../../services/upstream-tab/upstream-cards-detail';

import * as S from './fallback-select.style';
import { DataTable } from './creation/data-table/data-table';

export const FallbackSelect = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState(RADIO_GROUP_NAME.SELECT);
  // useEffect(() => {
  //   updateRadioValueAction(dispatch, value);
  // }, [value]);
  const { data, isFetching } = useUpstreamCardsDetailsQuery();
  // console.log('data', state);
  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    updateRadioValueAction(dispatch, e.target.value);
  };

  return (
    <S.UpstreamCreationContainer>
      <S.BorderBox>
        <Radio.Group onChange={onRadioChange} value={value}>
          <Radio value={RADIO_GROUP_NAME.SELECT}>{t('upstream_tab.upstream_selection')}</Radio>
          <Radio value={RADIO_GROUP_NAME.CREATE}>{t('upstream_tab.create_upstream')}</Radio>
        </Radio.Group>
        <S.SelectContainer>
          {value === RADIO_GROUP_NAME.SELECT ? <Card cardData={data?.content} loading={isFetching} /> : <NameInputs />}
        </S.SelectContainer>
      </S.BorderBox>
      {state.upstreamTab.activeSelect.cardId && value === RADIO_GROUP_NAME.SELECT && <CardDetail />}
      {value === RADIO_GROUP_NAME.CREATE && <DataTable />}
    </S.UpstreamCreationContainer>
  );
};
