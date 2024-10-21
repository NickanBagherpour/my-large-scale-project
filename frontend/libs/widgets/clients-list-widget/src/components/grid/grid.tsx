import * as S from './grid.style';
import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ClientType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import Mockify from '@oxygen/mockify';

type Props = {
  data: ClientType[];
  total?: number;
};

export default function Grid(props: Props) {
  const { data, total } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  return (
    <>
      <S.Container>
        {data.map(({ name, description, isActiveInTheService, date }, idx) => (
          <GridCard
            key={idx}
            name={description}
            englishName={name}
            status={isActiveInTheService ? 'active' : 'inactive'}
            date={date}
            href='/'
          />
        ))}
      </S.Container>

      {page * Mockify.CLIENTS_LIST_LIMIT <= (total ?? 0) && (
        <S.Button variant='text' color='primary' onClick={() => updatePagination(dispatch)}>
          <span>{t('show_all')}</span>
          <i className='icon-chev-down' />
        </S.Button>
      )}
    </>
  );
}
