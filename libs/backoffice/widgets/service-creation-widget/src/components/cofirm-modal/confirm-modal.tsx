import { useTr } from '@oxygen/translation';
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
    <S.Modal
      centered
      open={isOpen}
      closable={true}
      onCancel={toggle}
      headerDivider={true}
      destroyOnClose
      title={t('attention')}
      onOk={onOk}
      okText={t('continue')}
      cancelText={t('cancel')}
      okButtonProps={{ className: 'ok-button' }}
      cancelButtonProps={{ className: 'cancel-button' }}
    >
      <S.Txt>{t('proceed_notice', { name: fieldName })}</S.Txt>
    </S.Modal>
  );
}
