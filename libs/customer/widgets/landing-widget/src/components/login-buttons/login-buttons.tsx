import { useTr } from '@oxygen/translation';
import * as S from './login-buttons.style';

export default function () {
  const [t] = useTr();
  return (
    <S.Btns>
      <S.LoginBtn>
        <S.ClockIcon className='icon-clock' />
        {t('login_to_platform')}
      </S.LoginBtn>
      <S.ManualBtn>{t('paltform_manual')}</S.ManualBtn>
    </S.Btns>
  );
}
