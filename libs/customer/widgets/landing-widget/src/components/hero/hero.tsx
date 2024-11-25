import { useTr } from '@oxygen/translation';
import * as S from './hero.style';
import Link from 'next/link';
import { Icons } from '@oxygen/ui-kit';
import userChartsImg from 'apps/customer-portal/public/assets/images/user-charts.png';
import LoginButtons from '../login-buttons/login-buttons';
import Image from 'next/image';
import { ROUTES } from '@oxygen/utils';

const HeroSection = () => {
  const [t] = useTr();
  return (
    <S.Hero>
      <S.Nav>
        <S.BankLink href={'/'}>
          <Icons.BankLogo width={21} height={29} />
        </S.BankLink>
        <S.AppName>{t('app_name')}</S.AppName>
        <S.LoginLink href={ROUTES.CUSTOMER.AUTH}>{t('login_to_platform')}</S.LoginLink>
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

        <S.ImgContainer>
          <Image priority fill src={userChartsImg} alt='' sizes='(min-width: 1200px) 50vw, 100vw' />
        </S.ImgContainer>
      </S.Intro>
    </S.Hero>
  );
};

export default HeroSection;
