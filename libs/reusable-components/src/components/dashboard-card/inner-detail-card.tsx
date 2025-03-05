import * as S from './inner-detail-card.style';
type Props = {
  title?: string;
  description?: string;
  containerStyle?: React.CSSProperties;
};
const InnerDetailCard: React.FC<Props> = ({ title, description, containerStyle }) => {
  return (
    <S.Container style={containerStyle}>
      <S.Title>{title}</S.Title>
      <span>{description}</span>
    </S.Container>
  );
};
export default InnerDetailCard;
