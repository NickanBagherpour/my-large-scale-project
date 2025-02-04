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
  const { data: drafts, isFetching: isFetchingDrafts } = useGetDraftsQuery({
    page: 0,
    size: pageSize,
    sort: 'createDate,DESC',
  });

  const getAllDrafts = () => {
    const totalElements = drafts?.totalElements;
    if (totalElements) {
      setPageSize(totalElements);
    }
  };

  if (!drafts) return null;

  return (
    <Container title={t('draft')} fillContainer={false}>
      <S.Grid>
        {drafts.content.map((item) => (
          <DraftCard key={item.clientId} {...item} />
        ))}
      </S.Grid>

      {!drafts.last && (
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
    </Container>
  );
}
