import { Button, Divider, Progress } from '@oxygen/ui-kit';
import * as S from './draft-card.style';
import { useTr } from '@oxygen/translation';
import { useQueryClient } from '@tanstack/react-query';
import { ROUTES, RQKEYS } from '@oxygen/utils';

type DraftCardType = {
  id: number;
  name: string;
  level: 1 | 2 | 3 | 4;
};

export default function DraftCard(props: DraftCardType) {
  const { name, level, id } = props;
  const queryClient = useQueryClient();

  const remove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const test = RQKEYS.SERVICES_LIST.DRAFTS;
    e.preventDefault();
    queryClient.setQueryData([RQKEYS.SERVICES_LIST.DRAFTS], (oldData: DraftCardType[]) => {
      return oldData.filter((item) => item.id !== id);
    });
  };

  const [t] = useTr();
  const levelsMap: Record<DraftCardType['level'], string> = {
    1: t('service_name'),
    2: t('service_info'),
    3: t('add_documents'),
    4: t('operational'),
  };

  const progressPercentage = level * 20;

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
        <span>{progressPercentage}%</span>
        <Divider type={'vertical'} />
        <span>
          {t('next_level')}
          {':\u00A0\u00A0'}
          {levelsMap[level + 1]}
        </span>
      </S.Footer>
    </S.Container>
  );
}
