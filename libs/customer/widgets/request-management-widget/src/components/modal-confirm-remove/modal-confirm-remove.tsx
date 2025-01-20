import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './modal-confirm-remove.style';

type Props = {
  isOpen: boolean;
  id: number | undefined;
  name: string;
  toggle: () => void;
  onDelete: (id?: number) => void;
  loading: boolean;
};

export default function RemoveModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id, name, onDelete, loading } = props;
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={t('remove_modal.remove_request')}
      open={isOpen}
      closable={true}
      onCancel={() => toggle()}
      footer={[
        <Button onClick={() => toggle()} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <Button
          onClick={() => {
            onDelete(id);
          }}
          size='large'
          color='error'
          loading={loading}
        >
          {t('remove_modal.remove')}
        </Button>,
      ]}
    >
      <S.MarkText
        text={t('remove_modal.are_you_sure_to_remove', { name })}
        wordToHighlight={name}
        highlightColor={theme.error.main}
      />
    </Modal>
  );
}
