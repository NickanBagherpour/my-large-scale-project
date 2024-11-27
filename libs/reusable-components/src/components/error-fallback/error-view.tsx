'use client'
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { MAIN_HREF } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { useAppTheme, useAuth } from '@oxygen/hooks';
// import LazyLottie from '../animation-loader/lazy-lottie';
import * as S from './error-view.style';
import { Container } from '@oxygen/ui-kit';

type Props = {
  onRetry?: () => void;
  onReturn?: () => void;
  errorCode?: string;
  title: string;
  description: string;
  animationData?: any;
  image?: ReactNode;
};
const ErrorView = ({ onRetry, onReturn, errorCode, title, description, image }:Props) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const { isAuth } = useAuth();
  const router = useRouter();
  function previousHandler() {
    if (!isAuth) {
      router.push(MAIN_HREF.AUTH);
      return;
    }
    // if (!isSameDomain()) {
    //   router.back();
    // } else {
    router.push(MAIN_HREF.LANDING);
    // }
  }
  // function isSameDomain() {
  //   const previousUrl = document.referrer;
  //   const sameDomain = previousUrl.includes(window.location.origin);
  //   return sameDomain;
  // }
  const reloadPage = () => {
    router.refresh();
  };
  return (
    <Container margin={'1.6rem'} fillContainer={true} >
      <S.ContentContainer>
        <S.TextContainer>
          {errorCode && (
            <S.StyledText $fontWeight={600} $color={theme.primary._700}>
              {errorCode}
            </S.StyledText>
          )}
          <S.StyledText $fontSize='3.6rem' $fontWeight={700}>
            {title}
          </S.StyledText>
          <S.StyledText $fontSize='2rem' $fontWeight={400} $lineHeight={3.2}>
            {description}
          </S.StyledText>
          <S.ButtonGroupContainer>
            <S.StyledButton variant='outlined' size='middle' onClick={onReturn ?? previousHandler}>
              {t('button.return')}
            </S.StyledButton>
            <S.StyledButton size='middle' color={'primary'} onClick={onRetry ?? reloadPage}>
              {t('button.retry')}
            </S.StyledButton>
          </S.ButtonGroupContainer>
        </S.TextContainer>
        <S.AnimationContainer>
          {/* {animationData && <LazyLottie animationData={animationData} height={'30rem'} width={'30rem'} />} */}
          {image}
        </S.AnimationContainer>
      </S.ContentContainer>
    </Container>
  );
};
export default ErrorView;
