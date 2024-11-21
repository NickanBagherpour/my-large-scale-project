import { useTr } from '@oxygen/translation';
import { EMAIL, PHONE_NUM } from '../../utils/consts';
import * as S from './footer.style';

export default function Footer() {
  const [t] = useTr();

  return (
    <S.Container>
      <div>
        <S.PhoneNum>
          {t('phone_number')}: {PHONE_NUM}
        </S.PhoneNum>
        <S.Email>
          {t('email')}: {EMAIL}
        </S.Email>
      </div>
      <S.Name>{t('sadad_informatics_corporation')}</S.Name>
    </S.Container>
  );
}
