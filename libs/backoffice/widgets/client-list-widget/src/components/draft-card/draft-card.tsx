import { Button, Progress } from '@oxygen/ui-kit';
import * as S from './draft-card.style';
import { ROUTES } from '@oxygen/utils';
import { Draft } from '../../types';
import { useDeleteDraft } from '../../services/delete-draft.api';
import RemoveDraftModal from '../remove-draft-modal/remove-draft-modal';
import { useState } from 'react';
import { useApp } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';

export default function DraftCard(props: Draft) {
  const { stepName, clientName, progressPercent } = props;
  const { mutate: removeDraft, isPending } = useDeleteDraft();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification } = useApp();
  const [t] = useTr();

  const openModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isPending) return;
    setIsModalOpen(false);
  };

  const onRemoveDraft = () => {
    removeDraft(clientName, {
      onSuccess() {
        notification.success({ message: t('draft_was_remove') });
      },
    });
  };

  return (
    <>
      <S.Container href={`${ROUTES.BACKOFFICE.CLIENT_CREATION}?client-name=${clientName}`}>
        <S.Header>
          <S.Name>{clientName}</S.Name>
          <Button onClick={openModal} color='primary' variant='text' size='small'>
            <S.Trash className='icon-trash' />
          </Button>
        </S.Header>

        <Progress percent={progressPercent} showInfo={false} isPrimary />

        <S.Footer>
          ({stepName}) {progressPercent}%
        </S.Footer>
      </S.Container>

      <RemoveDraftModal
        isOpen={isModalOpen}
        close={closeModal}
        name={clientName}
        remove={onRemoveDraft}
        isLoading={isPending}
      />
    </>
  );
}
