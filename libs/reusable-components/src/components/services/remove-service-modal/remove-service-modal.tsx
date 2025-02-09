import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  name: string;
  close: () => void;
  onRemove: () => void;
};

export default function RemoveServiceModal(props: Props) {
  const { isOpen, close, name, onRemove } = props;
  const [t] = useTr();
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={t('uikit.remove_service')}
      open={isOpen}
      closable={true}
      onCancel={close}
      footer={[
        <Button onClick={close} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <Button onClick={onRemove} size='large' color='error'>
          {t('uikit.remove')}
        </Button>,
      ]}
    >
      <S.MarkText
        wordToHighlight={name}
        highlightColor={theme.error.main}
        text={t('uikit.are_you_sure_to_remove', { id: name })}
      />
    </Modal>
  );
}
