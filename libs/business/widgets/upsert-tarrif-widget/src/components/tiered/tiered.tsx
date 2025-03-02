import { useTr } from '@oxygen/translation';
import * as S from './tiered.style';

export default function Tiered() {
  const [t] = useTr();
  return (
    <S.Container>
      {Array.from({ length: 3 }).map((_, idx) => (
        <S.Article key={idx}>
          <S.Index>{idx + 1}</S.Index>
          <span>{t('from')}</span>
          <S.Input placeholder={t('count')} />
          <span>{t('to')}</span>
          <S.Input placeholder={t('count')} />
          <span>{t('request_tariff_applies')}</span>
          <S.Input placeholder={t('tariff_irr')} />
          <span>{t('calculated_in_irr')}</span>

          <S.TrashBtn variant='link' color='error'>
            <i className='icon-trash' />
          </S.TrashBtn>
        </S.Article>
      ))}
    </S.Container>
  );
}
