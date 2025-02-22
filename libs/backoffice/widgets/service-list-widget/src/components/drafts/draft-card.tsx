import { MouseEvent, SyntheticEvent, useState } from 'react';
import { Button, Divider, Progress } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useQueryClient } from '@tanstack/react-query';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { ConfirmModal } from '@oxygen/reusable-components';
import * as S from './draft-card.style';

type DraftCardType = {
  id: number;
  name: string;
  level?: 1 | 2 | 3 | 4 | 5;
  progressPercentage: number;
};

export default function DraftCard(props: DraftCardType) {
  const { name, level = 1, id, progressPercentage } = props;
  const queryClient = useQueryClient();
  const [t] = useTr();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeConfirmModal = () => setShowConfirmModal(false);

  const openConfirmModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const remove = (e: SyntheticEvent) => {
    e.preventDefault();
    queryClient.setQueryData([RQKEYS.BACKOFFICE.SERVICES_LIST.DRAFTS], (oldData: DraftCardType[]) => {
      return oldData.filter((item) => item.id !== id);
    });
  };

  const levelsMap: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: t('general_info'),
    2: t('route'),
    3: t('scope'),
    4: t('upstream'),
    5: t('info_confirm'),
  };

  return (
    <>
      <S.Container href={ROUTES.BACKOFFICE.SERVICE_CREATION + `?service-name=${name}`}>
        <S.Header>
          <S.Name>{name}</S.Name>
          {/* <Button onClick={openConfirmModal} color='primary' variant='text' size='small'>
            <S.Trash className='icon-trash' />
          </Button> */}
        </S.Header>

        <Progress percent={progressPercentage} showInfo={false} isPrimary />

        <S.Footer>
          <span>{progressPercentage}%</span>
          <Divider type={'vertical'} />
          <span>
            {t('next_level')}
            {':\u00A0\u00A0'}
            {levelsMap[level]}
          </span>
        </S.Footer>
      </S.Container>
      {/* <ConfirmModal
        title={t('draft_delete_title')}
        onConfirm={remove}
        open={showConfirmModal}
        onCancel={closeConfirmModal}
        onClose={closeConfirmModal}
      >
        {t('draft_delete_confirm') + ` ${name} ` + t('are_you_sure')}
      </ConfirmModal> */}
    </>
  );
}
