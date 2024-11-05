import { CSSProperties } from 'styled-components';
import * as S from './secondary-title.style';

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
};
const SecondaryTitle: React.FC<Props> = ({ text, ...rest }: Props) => {
  return <S.Container {...rest}>{text}</S.Container>;
};
export default SecondaryTitle;
