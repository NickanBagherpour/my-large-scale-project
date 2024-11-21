import { useTr } from '@oxygen/translation';
import * as S from './hero.style';
import Link from 'next/link';
import { Icons } from '@oxygen/ui-kit';
import userChartsImg from 'apps/customer-portal/public/assets/images/user-charts.svg';
import Image from 'next/image';
import LoginButtons from '../login-buttons/login-buttons';

const HeroSection = () => {
  const [t] = useTr();
  return (
    <S.Hero>
      <S.Nav>
        <S.BankLink href={'/'}>
          <Icons.BankLogo width={21} height={29} />
        </S.BankLink>
        <S.AppName>{t('widget_name')}</S.AppName>
        <S.LoginLink href='/'>{t('login_to_platform')}</S.LoginLink>
        <Link href='/'>
          <Icons.SadadLogoLight width={69} height={21} />
        </Link>
      </S.Nav>

      <S.Intro>
        <S.Info>
          <S.Title>
            {t('oxygen_platform')} <span>{t('oxygen_pro')}</span>
          </S.Title>
          <S.Slogon>{t('oxygen_slogon')}</S.Slogon>
          <LoginButtons />
        </S.Info>
        <Image priority src={userChartsImg} alt='' width={740} height={723} />
      </S.Intro>
    </S.Hero>
  );
};

export default HeroSection;
