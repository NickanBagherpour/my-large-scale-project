import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useTheme } from 'styled-components';
import * as S from './stop-service-modal.style';

type Props = {
  isOpen: boolean;
  id: string;
  toggle: () => void;
};

export default function StopServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id } = props;
  const theme = useTheme();

  return (
    <Modal
      centered
      title={t('stop_service')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <Button onClick={toggle} size='large' color='warning' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <S.RemoveBtn onClick={toggle} size='large' color='warning'>
          {t('button.confirm')}
        </S.RemoveBtn>,
      ]}
    >
      <S.MarkText
        text={t('are_you_sure_to_stop_service', { id })}
        wordToHighlight={id}
        highlightColor={theme.warning.main}
      />
    </Modal>
  );
}
