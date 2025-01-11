import AnimatedStatus, { StatusProps } from '../animated-status/animated-status';
import { ReactNode } from 'react';
import * as S from './status-modal.style';

type Props = {
  isOpen: boolean;
} & {
  [K in StatusProps['status'] as `${K}Props`]: {
    footer: ReactNode;
  };
} & StatusProps;

export default function StatusModal(props: Props) {
  const { isOpen, status } = props;
  const { footer: loadingFooter, ...loadingProps } = props.loadingProps;
  const { footer: successFooter, ...successProps } = props.successProps;
  const { footer: errorFooter, ...errorProps } = props.errorProps;
  const currentFooter = props[`${status}Props`].footer;

  return (
    <S.Modal
      centered
      open={isOpen}
      closable={false}
      headerDivider={false}
      destroyOnClose
      maskClosable={false}
      footer={false}
      width='49.4rem'
    >
      <AnimatedStatus status={status} loadingProps={loadingProps} errorProps={errorProps} successProps={successProps} />
      <S.Container>{currentFooter}</S.Container>
    </S.Modal>
  );
}
