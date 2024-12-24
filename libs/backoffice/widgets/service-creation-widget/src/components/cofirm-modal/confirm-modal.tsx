import { useTr } from '@oxygen/translation';
import { Modal } from '@oxygen/ui-kit';
import * as S from './confirm-modal.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  onConfirm: () => void;
  fieldName: string;
};

export default function ConfirmModal(props: Props) {
  const { isOpen, toggle, onConfirm, fieldName } = props;
  const [t] = useTr();

  const onOk = () => {
    onConfirm();
    toggle();
  };

  return (
    <Modal
      centered
      open={isOpen}
      closable={true}
      onCancel={toggle}
      headerDivider={true}
      destroyOnClose
      title={t('attention')}
      onOk={onOk}
    >
      <S.Txt>{t('proceed_notice', { name: fieldName })}</S.Txt>
    </Modal>
  );
}
