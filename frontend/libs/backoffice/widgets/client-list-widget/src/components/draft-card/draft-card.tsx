import { Button, Progress } from '@oxygen/ui-kit';
import * as S from './draft-card.style';
import { useTr } from '@oxygen/translation';
import { useQueryClient } from '@tanstack/react-query';
import { ROUTES, RQKEYS } from '@oxygen/utils';

type DraftCardType = {
  id: number;
  name: string;
  level: 1 | 2 | 3;
};

export default function DraftCard(props: DraftCardType) {
  const { name, level, id } = props;
  const queryClient = useQueryClient();

  const remove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    queryClient.setQueryData([RQKEYS.CLIENTS_LIST.DRAFTS], (oldData: DraftCardType[]) => {
      return oldData.filter((item) => item.id !== id);
    });
  };

  const [t] = useTr();
  const levelsMap: Record<DraftCardType['level'], string> = {
    1: t('get_info'),
    2: t('add_service'),
    3: t('add_plugin'),
  };

  const progressPercentage = level * 25;

  return (
    <S.Container href={ROUTES.BACKOFFICE.CLIENT_CREATION}>
      <S.Header>
        <S.Name>{name}</S.Name>
        <Button onClick={remove} color='primary' variant='text' size='small'>
          <S.Trash className='icon-trash' />
        </Button>
      </S.Header>

      <Progress percent={progressPercentage} showInfo={false} isPrimary />

      <S.Footer>
        ({levelsMap[level]}) {progressPercentage}%
      </S.Footer>
    </S.Container>
  );
}
