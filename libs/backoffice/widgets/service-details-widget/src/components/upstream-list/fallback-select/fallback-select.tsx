import { useTr } from '@oxygen/translation';

import { Card } from './selection/card/card';
import { useAppDispatch, useAppState } from '../../../context';
import { CardDetail } from './selection/card-detail/card-detail';
import { useUpstreamCardsDetailQuery } from '../../../services/upstream-tab/upstream-cards-detail';

import * as S from './fallback-select.style';
import { Input } from '@oxygen/ui-kit';
import { useState } from 'react';
import { NoResult } from '@oxygen/reusable-components';

export const FallbackSelect = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [searchValue, setSearchValue] = useState('');

  const { data, isFetching } = useUpstreamCardsDetailQuery(queryParams());

  function queryParams() {
    const params = {
      page: 0,
      size: 8,
      sort: [''],
      'search-field': searchValue,
    };
    return params;
  }
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <S.UpstreamCreationContainer>
      <S.BorderBox>
        <S.SelectContainer>
          <Input
            value={searchValue}
            onChange={(e) => handleChange(e)}
            placeholder={t('upstream_tab.placeholder')}
            autoFocus
          />
          {data?.content.length ? (
            <Card cardData={data?.content} loading={isFetching} wordToHighlight={searchValue} />
          ) : (
            <NoResult isLoading={isFetching} />
          )}
        </S.SelectContainer>
      </S.BorderBox>
      {state.upstreamTab.activeSelect.cardId && <CardDetail />}
    </S.UpstreamCreationContainer>
  );
};
