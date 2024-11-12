import { useTr } from '@oxygen/translation';
import { Button, ButtonProps, Modal, ModalProps } from '@oxygen/ui-kit';
import { ReactElement, SyntheticEvent } from 'react';

type Props = {
  title: string;
  onCancel: (e?: SyntheticEvent) => void;
  onConfirm: (e?: SyntheticEvent) => void;
  showConfirm?: boolean;
  showCancel?: boolean;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  modalProps?: ModalProps;
  isOpen?: boolean;
  footer: ReactElement;
};
const ConfirmModal: React.FC<Props> = ({
  onCancel,
  onConfirm,
  title,
  modalProps,
  isOpen,
  confirmButtonProps,
  cancelButtonProps,
  showConfirm,
  showCancel,
  footer: customFooter,
}) => {
  const [t] = useTr();
  const footer: Array<JSX.Element> = [];
  if (showConfirm || showCancel) {
    if (showConfirm) {
      footer.push(
        <Button onClick={onCancel} size='large' color='primary' variant='outlined' {...cancelButtonProps}>
          {t('button.cancel')}
        </Button>
      );
    }
    if (showCancel) {
      //   footer.push(
      //     <S.ConfirmButton onClick={toggle} size='large' color='error'>
      //       {t('remove')}
      //     </S.ConfirmButton>
      //   );
    }
  } else {
    footer.push(customFooter);
  }
  return <Modal centered title={title} open={isOpen} onCancel={onCancel} footer={footer} {...modalProps}></Modal>;
};
export default ConfirmModal;
