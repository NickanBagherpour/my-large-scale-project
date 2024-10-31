import * as S from './clients.style';
import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ClientType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import Mockify from '@oxygen/mockify';

type Props = {
  data: ClientType[];
  total?: number;
  searchTerm: string;
  isLoading: boolean;
};

export default function Clients(props: Props) {
  const { data, total, searchTerm, isLoading } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  const showLoadMore = page * Mockify.CLIENTS_LIST_LIMIT <= (total ?? 0) && data.length >= Mockify.CLIENTS_LIST_LIMIT;

  return (
    <>
      <S.Grid>
        {data.map(({ name, description, isActiveInTheService, date }, idx) => (
          <GridCard
            key={idx}
            name={description}
            englishName={name}
            status={isActiveInTheService ? 'active' : 'inactive'}
            date={date}
            wordToHighlight={searchTerm}
            href='/client-details'
          />
        ))}
      </S.Grid>

      {showLoadMore && (
        <S.Button variant='text' color='primary' disabled={isLoading} onClick={() => updatePagination(dispatch)}>
          <span>{t('show_all')}</span>
          <i className='icon-chev-down' />
        </S.Button>
      )}
    </>
  );
}
