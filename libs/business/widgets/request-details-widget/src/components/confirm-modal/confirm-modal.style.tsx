import styled from 'styled-components';
import { Modal } from '@oxygen/ui-kit';

export const StyledModal = styled(Modal)`
  & .ant-modal-content {
    padding: 1.6rem;

    .ant-divider {
      margin: 1.6rem 0;
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & .ant-form-item {
    margin: 0;
  }
`;

export const ModalMessage = styled.p`
  color: ${(p) => p.theme.text.primary}
  text-align: right;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
  padding: 1rem;
  margin: 0;
`;

export const ClientName = styled.span`
  color: ${(p) => p.theme.primary.main};
  text-align: right;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
`;
