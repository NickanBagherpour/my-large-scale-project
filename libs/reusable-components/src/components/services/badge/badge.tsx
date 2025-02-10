import * as S from './badge.style';

type Props = {
  items: string[];
};

export default function WidthBadge(props: Props) {
  const { items } = props;
  const count = items.length;
  const firstItem = items[0];
  return (
    <>
      {firstItem}
      {count > 1 && <S.Badge count={`+${count - 1}`} />}
    </>
  );
}
