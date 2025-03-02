import * as S from './title.style';

type Props = {
  children: string;
};

export default function Title(props: Props) {
  const { children } = props;
  return <S.Title>{children}</S.Title>;
}
