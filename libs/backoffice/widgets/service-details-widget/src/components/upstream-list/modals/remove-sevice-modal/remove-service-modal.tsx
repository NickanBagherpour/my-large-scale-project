import { useTheme } from 'styled-components';

import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  id: Nullable<string>;
  cancelToggle: () => void;
  deleteToggle: () => void;
};

export default function RemoveServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, cancelToggle, deleteToggle, id } = props;
  const theme = useTheme();

  return (
    <Modal
      centered
      title={t('upstream_tab.remove_upstream')}
      open={isOpen}
      closable={true}
      onCancel={cancelToggle}
      footer={[
        <Button onClick={cancelToggle} size='large' color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <S.RemoveBtn onClick={deleteToggle} size='large' color='error'>
          {t('remove')}
        </S.RemoveBtn>,
      ]}
    >
      <S.MarkText
        text={t('upstream_tab.are_you_sure_to_remove', { id })}
        wordToHighlight={id ?? ''}
        highlightColor={theme.error.main}
      />
    </Modal>
  );
}
