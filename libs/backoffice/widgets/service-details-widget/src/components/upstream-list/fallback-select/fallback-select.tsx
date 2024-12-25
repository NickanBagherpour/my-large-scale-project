import { useState } from 'react';

import { useBounce } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { Input, Pagination } from '@oxygen/ui-kit';
import { NoResult } from '@oxygen/reusable-components';

import { Cards } from './selection/cards/cards';
import { useAppDispatch, useAppState } from '../../../context';
import { UPSTREAM_CARD_PAGE_SIZE } from '../../../utils/consts';
import { CardDetail } from './selection/card-detail/card-detail';
import { useUpstreamCardsDetailQuery } from '../../../services/upstream-tab/get-upstream-cards-detail';

import * as S from './fallback-select.style';

export const FallbackSelect = () => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  //States
  const [{ searchTerm, page }, setQuery] = useState({ page: 1, searchTerm: '' });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  //Queries
  const { data, isFetching } = useUpstreamCardsDetailQuery(queryParams());

  useBounce(() => {
    setDebouncedSearchTerm(searchTerm);
    setQuery((prev) => ({ ...prev, page: 1 }));
  }, [searchTerm]);

  function queryParams() {
    const params = {
      page: page - 1,
      size: UPSTREAM_CARD_PAGE_SIZE,
      sort: [''],
      'search-field': debouncedSearchTerm,
    };
    return params;
  }
  //Handlers
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, searchTerm: e.target.value.trimStart() }));
  };
  const changePage = (currentPage: number) => {
    setQuery((prev) => ({ ...prev, page: currentPage }));
  };

  return (
    <S.UpstreamCreationContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBox>
        <S.SelectContainer>
          <Input
            value={searchTerm}
            onChange={(e) => handleChange(e)}
            placeholder={t('upstream_tab.placeholder')}
            autoFocus
          />
          {data?.content.length ? (
            <>
              <S.DataSection>
                <Cards cardData={data?.content} loading={isFetching} wordToHighlight={searchTerm} />
              </S.DataSection>
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
      {state.upstreamTab.activeSelect.cardId && <CardDetail id={state.upstreamTab.activeSelect.cardId} />}
    </S.UpstreamCreationContainer>
  );
};
