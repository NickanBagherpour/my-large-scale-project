import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import { useTheme } from 'styled-components';
import * as S from './start-service-modal.style';

type Props = {
  isOpen: boolean;
  id: string;
  toggle: () => void;
};

export default function StartServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id } = props;
  const theme = useTheme();

  return (
    <Modal
      centered
      title={t('make_operational')}
      open={isOpen}
      closable={true}
      onCancel={toggle}
      footer={[
        <Button onClick={toggle} size='large' color='secondary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <S.RemoveBtn onClick={toggle} size='large' color='secondary'>
          {t('button.confirm')}
        </S.RemoveBtn>,
      ]}
    >
      <S.MarkText
        text={t('are_you_sure_to_make_operational', { id })}
        wordToHighlight={id}
        highlightColor={theme.secondary.main}
      />
    </Modal>
  );
}
