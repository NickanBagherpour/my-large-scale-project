import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './confirm-remove-modal.style';

type Props = {
  title: string;
  message: string;
  isOpen: boolean;
  close: () => void;
  isLoading: boolean;
  onRemove: () => void;
  wordToHighlight: string;
};

export default function ConfirmRemoveModal(props: Props) {
  const { isOpen, close, wordToHighlight, onRemove, title, message, isLoading } = props;
  const [t] = useTr();
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={title}
      open={isOpen}
      closable={!isLoading}
      onCancel={close}
      maskClosable={!isLoading}
      footer={[
        <Button onClick={close} size='large' color='primary' variant='outlined' disabled={isLoading}>
          {t('button.cancel')}
        </Button>,
        <Button onClick={onRemove} size='large' color='error' loading={isLoading} disabled={isLoading}>
          {t('uikit.remove')}
        </Button>,
      ]}
    >
      <S.MarkText wordToHighlight={wordToHighlight} highlightColor={theme.error.main} text={message} />
    </Modal>
  );
}
