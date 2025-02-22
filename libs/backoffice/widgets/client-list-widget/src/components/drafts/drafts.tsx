import { Container } from '@oxygen/ui-kit';
import * as S from './drafts.style';
import DraftCard from '../draft-card/draft-card';
import { useTr } from '@oxygen/translation';
import { useState } from 'react';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { INITIAL_DRAFTS_PAGE_SIZE } from '../../utils/consts';

export default function Drafts() {
  const [t] = useTr();
  const [pageSize, setPageSize] = useState(INITIAL_DRAFTS_PAGE_SIZE);
  const { data, isFetching: isFetchingDrafts } = useGetDraftsQuery({
    page: 0,
    size: pageSize,
    sort: 'createDate,DESC',
  });

  if (!data?.content.length) return null;

  const { content: drafts, totalElements } = data;
  const hasMore = totalElements > drafts.length;
  const hasLess = pageSize === totalElements && pageSize > INITIAL_DRAFTS_PAGE_SIZE;

  const getAllDrafts = () => {
    if (totalElements) {
      setPageSize(totalElements);
    }
  };

  const showInitialDrafts = () => {
    // Adjust the page size to fetch the initial items. If the data is cached, we return it directly; otherwise, we fetch the most up-to-date drafts.
    setPageSize(INITIAL_DRAFTS_PAGE_SIZE);
  };

  return (
    <Container title={t('draft')} fillContainer={false}>
      <S.Grid>
        {drafts.map((item) => (
          <DraftCard key={item.clientId} {...item} />
        ))}
      </S.Grid>

      {hasMore && (
        <S.Button
          loading={isFetchingDrafts}
          variant='link'
          color='primary'
          disabled={isFetchingDrafts}
          onClick={getAllDrafts}
        >
          <span>{t('show_all')}</span>
          <i className='icon-chev-down' />
        </S.Button>
      )}

      {hasLess && (
        <S.Button variant='link' color='primary' onClick={showInitialDrafts}>
          <span>{t('show_less')}</span>
          <S.ShevDown className='icon-chev-down' />
        </S.Button>
      )}
    </Container>
  );
}
