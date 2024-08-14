import React from 'react';

import { Dialog, Loading } from '../index';
import styled from '@emotion/styled';

export type LoadingDialogProps = {
  open?: boolean;
  message?: string;
  onClose?: () => void;
};

const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border-bottom: 1px solid  ${(p) => p.theme.base.border};

  & .loading_message {
    white-space: break-spaces;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${(p) => p.theme.base.textPrimary};
  }
`;

const LoadingDialog: React.FC<LoadingDialogProps> = (props) => {
  const { open = false, message, onClose } = props;

  function handleClose(event: React.SyntheticEvent, reason: any) {
    // if (onClose) {
    //   onClose(event, reason);
    // }

    return;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
      <Wrapper>
        {message && <p className={'loading_message'}>{message}</p>}

        <Loading />
      </Wrapper>
    </Dialog>
  );
};
export default LoadingDialog;
