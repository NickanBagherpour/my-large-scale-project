import { ReactNode } from 'react';
import * as S from './auth-content.style';

type Props = {
  children: ReactNode;
};

export default function AuthContent(props: Props) {
  const { children } = props;
  return (
    <S.Main>
      <S.WithImgBackground>
        <S.FormContainer>{children}</S.FormContainer>
      </S.WithImgBackground>
    </S.Main>
  );
}
