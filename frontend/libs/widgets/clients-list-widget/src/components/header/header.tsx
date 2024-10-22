import { useTr } from '@oxygen/translation';
import * as S from './header.style';

type Props = {
  clientsCount: number;
};

export default function Header(props: Props) {
  const { clientsCount } = props;
  const [t] = useTr();

  return (
    <S.Header>
      <S.Name>{t('widget_name')}</S.Name>
      <S.Count>({clientsCount})</S.Count>
    </S.Header>
  );
}
