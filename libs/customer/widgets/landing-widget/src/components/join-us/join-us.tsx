import { useTr } from '@oxygen/translation';
import * as S from './join-us.style';
import developerImg from 'apps/customer-portal/public/assets/images/developer.svg';
import playImg from 'apps/customer-portal/public/assets/images/play-circle.svg';
import LoginButtons from '../login-buttons/login-buttons';
import Image from 'next/image';

export default function JoinUs() {
  const [t] = useTr();
  return (
    <S.Container>
      <S.Poster>
        <S.DevImgContainer>
          <S.DevImg src={developerImg} fill alt='' />
        </S.DevImgContainer>
        <S.PlayBtn shape='round' variant='link'>
          <Image src={playImg} alt='' fill />
        </S.PlayBtn>
      </S.Poster>
      <S.Txts>
        <S.Title>{t('join_us_now')}</S.Title>
        <S.Desc>{t('join_us_description')}</S.Desc>
        <LoginButtons />
      </S.Txts>
    </S.Container>
  );
}
