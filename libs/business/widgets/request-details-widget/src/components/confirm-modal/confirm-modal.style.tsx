import styled from 'styled-components';
import { Input, Modal } from '@oxygen/ui-kit';

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
  font-weight: 600;
  line-height: 2.5rem;
  padding: 1rem;
  margin: 0;
`;

export const ClientName = styled.span`
  color: ${(p) => p.theme.primary.main};
  text-align: right;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.5rem;
`;

export const StyledTextarea = styled(Input.TextArea)`
  border-radius: 1.2rem;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.2rem;
`;

export const StyledCount = styled.span`
  position: absolute;
  bottom: 35px;
  ${(p) => (p.theme.direction === 'rtl' ? 'right' : 'left')}:${(p) => (p.theme.direction === 'rtl' ? '10px' : '-50px')};
`;
