import { ReactElement, ReactNode } from 'react';
import * as S from './main-container.style';
import { useTr } from '@oxygen/translation';
import { Divider } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

type AppProps = PageProps & {
  title: string | string[];
  subtitle: string | string[];
  footer: ReactElement;
};
const MainContainer: React.FC<AppProps> = ({ title, subtitle, footer, children }) => {
  const [t] = useTr();
  return (
    <S.AppContainer title={title}>
      <S.SubtitleContainer>{subtitle}</S.SubtitleContainer>
      <S.ContentContainer>{children}</S.ContentContainer>

      <Divider />
      <S.FooterContainer>{footer}</S.FooterContainer>
    </S.AppContainer>
  );
};
export default MainContainer;
