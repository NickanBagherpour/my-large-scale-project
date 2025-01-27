import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';

import * as S from './error-fallback.style';

type ErrorFallbackProps = {
  error: {
    message: string;
  };
  reset: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, reset }) => {
  const [t] = useTr();

  const navigateToSupport = (e) => {
    //
  };

  return (
    <S.ErrorFallbackWrapper>
      <S.ErrorTitle>{t('message.unspecific')}</S.ErrorTitle>
      <S.ErrorDetail>{error.message}</S.ErrorDetail>
      <S.ButtonContainer>
        <Button variant={'outlined'} color={'primary'} onClick={reset}>
          {t('button.retry')}
        </Button>
        <Button variant={'outlined'} color={'error'} onClick={navigateToSupport}>
          {t('button.contact_support')}
        </Button>
      </S.ButtonContainer>
    </S.ErrorFallbackWrapper>
  );
};

export default ErrorFallback;
