import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  id: string;
  cancelToggle: () => void;
  deleteToggle: () => void;
};

export default function RemoveServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, cancelToggle, deleteToggle, id } = props;
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={t('remove_modal.remove_upstream')}
      open={isOpen}
      closable={true}
      onCancel={cancelToggle}
      footer={[
        <Button onClick={cancelToggle} color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <Button onClick={deleteToggle} color='error'>
          {t('remove_modal.remove')}
        </Button>,
      ]}
    >
      <S.MarkText
        text={t('remove_modal.are_you_sure_to_remove', { id })}
        wordToHighlight={id ?? ''}
        highlightColor={theme.error.main}
      />
    </Modal>
  );
}
