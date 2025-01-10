import { Modal } from '@oxygen/ui-kit';
import AnimatedStatus, { StatusProps } from '../animated-status/animated-status';
import { ReactNode } from 'react';
import * as S from './status-modal.style';

type Props = {
  isOpen: boolean;
  status: StatusProps['status'];
} & {
  [K in StatusProps['status'] as `${K}Props`]: {
    footer: ReactNode;
    description: StatusProps['description'];
    children?: StatusProps['children'];
  };
};

export default function StatusModal(props: Props) {
  const { isOpen, status } = props;
  const { footer, description, children } = props[`${status}Props`];
  return (
    <Modal
      centered
      open={isOpen}
      closable={false}
      headerDivider={false}
      destroyOnClose
      maskClosable={false}
      footer={false}
    >
      <AnimatedStatus status={status} description={description} children={children} />
      <S.Container>{footer}</S.Container>
    </Modal>
  );
}
