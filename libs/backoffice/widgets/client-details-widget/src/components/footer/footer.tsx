import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { useRouter } from 'next/navigation';
import * as S from './footer.style';

type Props = {
  isLoading: boolean;
};

export default function Footer(props: Props) {
  const { isLoading } = props;
  const router = useRouter();
  const [t] = useTr();

  if (isLoading) return null;

  return (
    <S.Container>
      <Button onClick={router.back} variant={'outlined'}>
        {t('button.return')}
      </Button>
    </S.Container>
  );
}
