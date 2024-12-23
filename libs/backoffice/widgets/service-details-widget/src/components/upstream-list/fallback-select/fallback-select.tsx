import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { Input, Pagination } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';

import { Card } from './selection/card/card';
import { useAppDispatch, useAppState } from '../../../context';
import { UPSTREAM_CARD_PAGE_SIZE } from '../../../utils/consts';
import { CardDetail } from './selection/card-detail/card-detail';
import { useUpstreamCardsDetailQuery } from '../../../services/upstream-tab/upstream-cards-detail';

import * as S from './fallback-select.style';

export const FallbackSelect = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const { data, isFetching } = useUpstreamCardsDetailQuery(queryParams());

  function queryParams() {
    const params = {
      page: page - 1,
      size: UPSTREAM_CARD_PAGE_SIZE,
      sort: [''],
      'search-field': searchValue,
    };
    return params;
  }
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const changePage = (currentPage) => {
    setPage(currentPage);
  };

  return (
    <S.UpstreamCreationContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBox>
        <S.SelectContainer>
          <Input
            value={searchValue}
            onChange={(e) => handleChange(e)}
            placeholder={t('upstream_tab.placeholder')}
            autoFocus
          />
          {data?.content.length ? (
            <>
              <Card cardData={data?.content} loading={isFetching} wordToHighlight={searchValue} />
              <S.PaginationBox>
                <Pagination
                  current={page}
                  total={data?.totalElements}
                  pageSize={UPSTREAM_CARD_PAGE_SIZE}
                  showSizeChanger={false}
                  align='center'
                  onChange={changePage}
                />
              </S.PaginationBox>
            </>
          ) : (
            <NoResult isLoading={isFetching} />
          )}
        </S.SelectContainer>
      </S.BorderBox>
      {state.upstreamTab.activeSelect.cardId && <CardDetail />}
    </S.UpstreamCreationContainer>
  );
};
