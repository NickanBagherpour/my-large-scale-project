import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  id: string;
  toggle: () => void;
};

export default function RemoveServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id } = props;
  const theme = useAppTheme();

  return (
    <Modal
      centered
      title={t('remove_service')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <Button onClick={toggle} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <S.RemoveBtn onClick={toggle} size='large' color='error'>
          {t('remove')}
        </S.RemoveBtn>,
      ]}
    >
      <S.MarkText text={t('are_you_sure_to_remove', { id })} wordToHighlight={id} highlightColor={theme.error.main} />
    </Modal>
  );
}
