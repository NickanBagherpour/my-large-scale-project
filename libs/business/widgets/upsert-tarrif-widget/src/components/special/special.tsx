import { useTr } from '@oxygen/translation';
import * as S from './special.style';
import AddCondition from '../add-condition/add-condition';

export default function Special() {
  const [t] = useTr();
  return (
    <S.Container>
      {Array.from({ length: 3 }).map((_, idx) => (
        <S.Article key={idx}>
          <S.Index>{idx + 1}</S.Index>

          <span>{t('from_transaction')}</span>
          <S.Input placeholder={t('amount_irr')} />

          <span>{t('to')}</span>
          <S.Input placeholder={t('amount_irr')} />

          <span>{t('request_tariff_applies')}</span>
          <S.Input placeholder={t('tariff_irr')} />

          <span>{t('max_tariff_irr')}</span>
          <S.Input placeholder={t('tariff_irr')} />

          <span>{t('be_calculated')}</span>

          <S.TrashBtn variant='link' color='error'>
            <i className='icon-trash' />
          </S.TrashBtn>
        </S.Article>
      ))}

      <AddCondition tariffType='special' onClick={() => void 1} />
    </S.Container>
  );
}
