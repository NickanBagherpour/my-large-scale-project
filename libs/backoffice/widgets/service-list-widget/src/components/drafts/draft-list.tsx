import { useMemo, useState } from 'react';
import { useTr } from '@oxygen/translation';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import { INITIAL_DRAFTS_PAGE_SIZE } from '../../utils/consts';
import DraftCard from './draft-card';

import * as S from './draft-list.style';

const DraftList: React.FC = () => {
  const [pageSize, setPageSize] = useState(INITIAL_DRAFTS_PAGE_SIZE);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [t] = useTr();
  const { data: drafts, isFetching: isFetchingDrafts } = useGetDraftsQuery({
    page: 0,
    size: pageSize,
    sort: 'createDate,DESC',
  });
  const hasDrafts = !!drafts?.content.length;
  const draftsSubTitle = drafts?.content.length ? `(${drafts?.content.length ?? 0})` : '';

  const getAllDrafts = () => {
    const totalElements = drafts?.totalElements;
    if (totalElements) {
      setPageSize(totalElements);
    }
    setShowLoadMore(false);
  };
  const visibleDrafts = useMemo(
    () => (showLoadMore ? drafts?.content.slice(0, INITIAL_DRAFTS_PAGE_SIZE) : drafts?.content),
    [showLoadMore, drafts]
  );
  return (
    <>
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} subtitle={draftsSubTitle} fillContainer={false}>
          <S.Grid>
            {visibleDrafts?.map((item) => (
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

          {(showLoadMore || isFetchingDrafts) && drafts?.totalElements > INITIAL_DRAFTS_PAGE_SIZE && (
            <S.Button loading={isFetchingDrafts} variant='link' color='primary' onClick={getAllDrafts}>
              <span>{t('button.show_all')}</span>
              <i className='icon-chev-down' />
            </S.Button>
          )}
          {!showLoadMore && !isFetchingDrafts && (
            <S.Button variant='link' color='primary' onClick={() => setShowLoadMore(true)}>
              <span>{t('button.show_less')}</span>
              <i className='icon-arrow-up' />
            </S.Button>
          )}
        </S.DraftsContainer>
      )}
    </>
  );
};
export default DraftList;
