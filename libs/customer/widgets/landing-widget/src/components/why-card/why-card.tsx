import * as S from './why-card.style';

type Props = {
  iconClassName: string;
  title: string;
  description: string;
};

export default function WhyCard(props: Props) {
  const { title, description, iconClassName } = props;

  return (
    <S.Container>
      <S.IconContainer>
        <S.Icon className={iconClassName} />
      </S.IconContainer>
      <S.Title>{title}</S.Title>
      <S.Desc>{description}</S.Desc>
    </S.Container>
  );
}
