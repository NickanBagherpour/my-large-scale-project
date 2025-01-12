import styled from 'styled-components';
import { Modal as UiKitModal } from '@oxygen/ui-kit';

export const Modal = styled(UiKitModal)`
  .ant-modal-footer,
  .ant-modal-body {
    margin: 0;
  }

  .ant-modal-content {
    padding: 3.2rem;
    border-radius: 2rem;
  }
`;

export const Container = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;

  .ant-btn {
    height: 5.2rem;
  }
`;
