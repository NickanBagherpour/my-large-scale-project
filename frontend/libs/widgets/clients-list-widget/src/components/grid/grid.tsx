import * as S from './grid.style';
import { GridCard } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

function getRandomItem<T>(arr: [T, T]): T {
  const randomIndex = Math.floor(Math.random() * 2); // Generates 0 or 1
  return arr[randomIndex];
}

export default function Grid() {
  const [t] = useTr();

  return (
    <>
      <S.Container>
        {Array.from({ length: 16 }).map((_, idx) => (
          <GridCard
            key={idx}
            name='پیام رسان بله'
            englishName='App-Bale'
            status={getRandomItem(['active', 'inactive'])}
            date='1403/02/24'
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
