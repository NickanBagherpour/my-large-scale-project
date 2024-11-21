import { useTr } from '@oxygen/translation';
import * as S from './login-buttons.style';
import { ROUTES } from '@oxygen/utils';

export default function () {
  const [t] = useTr();
  return (
    <S.Btns>
      <S.LoginBtn href={ROUTES.CUSTOMER.AUTH}>
        <S.ClockIcon className='icon-clock' />
        {t('login_to_platform')}
      </S.LoginBtn>
      <S.ManualBtn>{t('paltform_manual')}</S.ManualBtn>
    </S.Btns>
  );
}
