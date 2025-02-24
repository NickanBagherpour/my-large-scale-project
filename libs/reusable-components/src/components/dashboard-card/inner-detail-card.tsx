import * as S from './inner-detail-card.style';
type Props = {
  title?: string;
  description?: string;
};
const InnerDetailCard: React.FC<Props> = ({ title, description }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <span>{description}</span>
    </S.Container>
  );
};
export default InnerDetailCard;
