import { ModalProps as AntModalProps } from 'antd';
import { Divider } from '../divider/divider';

import * as S from './modal.style';

export type ModalProps = AntModalProps & {
  //
  headerDivider?: boolean;
};

export const Modal = (props: ModalProps) => {
  const { children, headerDivider = true, ...rest } = props;

  return (
    <S.StyledModal headerDivider={headerDivider} {...rest}>
      {headerDivider && <Divider />}
      {children}
    </S.StyledModal>
  );
};
