import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ClientType } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import * as S from './upstreams.style';

type Props = {
  data: ClientType[];
  total?: number;
  searchTerm: string;
  isLoading: boolean;
};

export default function Upstreams(props: Props) {
  const { data, total, searchTerm, isLoading } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  const showLoadMore = page * Mockify.UPSTREAM_LIST_LIMIT <= (total ?? 0) && data.length >= Mockify.UPSTREAM_LIST_LIMIT;

  return (
    <>
      <S.Grid>
        {data.map(({ name, date, activeServersCount }, idx) => (
          <GridCard
            key={idx}
            name={name}
            href='/upstream-details'
            activeServersCount={activeServersCount}
            wordToHighlight={searchTerm}
          />
        ))}
      </S.Grid>

      {showLoadMore && (
        <S.StyledButton variant='text' color='primary' disabled={isLoading} onClick={() => updatePagination(dispatch)}>
          <span>{t('show_all')}</span>
          <i className='icon-chev-down' />
        </S.StyledButton>
      )}
    </>
  );
}
