import * as S from './grid.style';
import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ClientType } from '../../types';

type Props = {
  data: ClientType[];
};

export default function Grid(props: Props) {
  const { data } = props;
  const [t] = useTr();

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

      <S.Button variant='text' color='primary'>
        <span>{t('show_all')}</span>
        <i className='icon-chev-down' />
      </S.Button>
    </>
  );
}
