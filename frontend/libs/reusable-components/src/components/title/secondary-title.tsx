import { HTMLAttributes } from 'react';
import * as S from './secondary-title.style';

type Props = HTMLAttributes<HTMLDivElement> & {
  text: string;
};
const SecondaryTitle: React.FC<Props> = ({ text, ...rest }: Props) => {
  return <S.Container {...rest}>{text}</S.Container>;
};
export default SecondaryTitle;
