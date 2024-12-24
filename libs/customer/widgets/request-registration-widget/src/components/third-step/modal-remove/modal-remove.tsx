import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useTheme } from 'styled-components';
import * as S from './modal-remove.style';

type Props = {
  isOpen: boolean;
  id: string;
  toggle: () => void;
};

export default function RemoveModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id } = props;
  const theme = useTheme();

  return (
    <Modal
      centered
      title={t('remove_modal.remove_service')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <Button onClick={toggle} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <S.RemoveBtn onClick={toggle} size='large' color='error'>
          {t('remove_modal.remove')}
        </S.RemoveBtn>,
      ]}
    >
      <S.MarkText
        text={t('remove_modal.are_you_sure_to_remove', { id })}
        wordToHighlight={id}
        highlightColor={theme.error.main}
      />
    </Modal>
  );
}
