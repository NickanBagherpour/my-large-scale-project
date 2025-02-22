import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './remove-draft-modal.style';

type Props = {
  isOpen: boolean;
  name: string;
  close: () => void;
  remove: () => void;
  isLoading: boolean;
};

export default function RemoveDraftModal(props: Props) {
  const [t] = useTr();
  const { isOpen, close, name, remove, isLoading } = props;
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={t('remove_draft')}
      open={isOpen}
      closable={true}
      onCancel={close}
      footer={[
        <Button key={'cancel'} onClick={close} size='large' color='primary' variant='outlined' disabled={isLoading}>
          {t('button.cancel')}
        </Button>,
        <Button key={'delete'} onClick={remove} size='large' color='error' loading={isLoading} disabled={isLoading}>
          {t('button.delete')}
        </Button>,
      ]}
    >
      <S.MarkText
        text={t('are_you_sure_to_remove', { name })}
        wordToHighlight={name}
        highlightColor={theme.error.main}
      />
    </Modal>
  );
}
