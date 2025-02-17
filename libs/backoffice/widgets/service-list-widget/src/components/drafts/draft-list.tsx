import { useMemo, useState } from 'react';
import { useTr } from '@oxygen/translation';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { INITIAL_DRAFTS_PAGE_SIZE } from '../../utils/consts';
import DraftCard from './draft-card';

import * as S from './draft-list.style';
import { Container } from '@oxygen/ui-kit';

const DraftList: React.FC = () => {
  const [pageSize, setPageSize] = useState(INITIAL_DRAFTS_PAGE_SIZE);
  const [t] = useTr();
  const { data: drafts, isFetching: isFetchingDrafts } = useGetDraftsQuery({
    page: 0,
    size: pageSize,
    sort: 'createDate,DESC',
  });
  if (!drafts) return null;
  const { totalElements } = drafts;
  const getAllDrafts = () => {
    if (totalElements && totalElements > INITIAL_DRAFTS_PAGE_SIZE) {
      setPageSize(totalElements);
    }
  };
  const getInitialDrafts = () => setPageSize(INITIAL_DRAFTS_PAGE_SIZE);
  const hasDrafts = !!drafts?.totalElements;
  const draftsSubTitle = drafts?.totalElements ? `(${totalElements})` : '';
  const loadMore = totalElements > pageSize;
  const showLoadMore = (isFetchingDrafts && loadMore) || loadMore;
  const loadLess = totalElements === pageSize && pageSize > INITIAL_DRAFTS_PAGE_SIZE;
  const showLoadLess = (isFetchingDrafts && loadLess) || loadLess;
  return (
    <>
      {hasDrafts && (
        <Container title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {drafts.content?.map((item) => (
              <DraftCard
                id={item?.serviceInfoId}
                level={item?.serviceProgress?.step}
                key={item?.serviceInfoId}
                name={item?.serviceName}
                progressPercentage={item?.serviceProgress?.percent}
              />
            ))}
          </S.Grid>

          {/* {console.log(draftList, 'draftList')} */}

          {showLoadMore && (
            <S.Button loading={isFetchingDrafts} variant='link' color='primary' onClick={getAllDrafts}>
              <span>{t('button.show_all')}</span>
              <i className='icon-chev-down' />
            </S.Button>
          )}
          {showLoadLess && (
            <S.Button loading={isFetchingDrafts} variant='link' color='primary' onClick={getInitialDrafts}>
              <span>{t('button.show_less')}</span>
              <i className='icon-arrow-up' />
            </S.Button>
          )}
        </Container>
      )}
    </>
  );
};
export default DraftList;
