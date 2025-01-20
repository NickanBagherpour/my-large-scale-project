import styled from 'styled-components';
import { Button, Modal } from '@oxygen/ui-kit';

export const StyledModal = styled(Modal)`
  & .ant-modal-content {
    padding: 3.2rem;

    & .ant-modal-body {
      margin: 0;
    }
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //gap: 2.4rem;
`;
export const AnimationContainer = styled.div`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 5.2rem;
  max-height: 5.2rem;
`;
