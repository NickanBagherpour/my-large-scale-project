import * as S from './services.style';
import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ServiceType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import Mockify from '@oxygen/mockify';

type Props = {
  data: ServiceType[];
  total?: number;
  searchTerm: string;
  isLoading: boolean;
};

export default function Services(props: Props) {
  const { data, total, searchTerm, isLoading } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  // const showLoadMore = page * Mockify.CLIENTS_LIST_LIMIT <= (total ?? 0) && data.length >= Mockify.CLIENTS_LIST_LIMIT;

  return (
    <>
      {/* <S.Grid>
        {data.map(({ name, description, isActiveInTheService, date }, idx) => (
          <GridCard
            key={idx}
            name={description}
            englishName={name}
            status={isActiveInTheService ? 'active' : 'inactive'}
            date={date}
            wordToHighlight={searchTerm}
            href='/'
          />
        ))}
      </S.Grid> */}

      {/* {showLoadMore && (
        <S.Button variant='text' color='primary' disabled={isLoading} onClick={() => updatePagination(dispatch)}>
          <span>{t('show_all')}</span>
          <i className='icon-chev-down' />
        </S.Button>
      )} */}
    </>
  );
}
