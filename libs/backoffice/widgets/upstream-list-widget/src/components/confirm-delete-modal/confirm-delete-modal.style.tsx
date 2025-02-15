import styled from 'styled-components';
import { Modal } from '@oxygen/ui-kit';
import { withOpacity } from '@oxygen/utils';

export const StyledModal = styled(Modal)`
  .ant-divider {
    margin-bottom: 1.6rem;
  }

  button {
    padding: 1rem 3rem;
    height: 4.8rem;
    max-width: 9.2rem;
    font-weight: 500;

    &[disabled] {
      background-color: ${(props) => withOpacity(props.theme.text.primary, 30)} !important;
      color: ${(props) => props.theme.onPrimary};
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

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
  margin: 0;
`;

export const ServiceCount = styled.span`
  color: ${(p) => p.theme.error.main};
  text-align: right;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.5rem;
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.5rem;
  color: ${(p) => p.theme.text.primary};
  max-height: 7.5rem;
  overflow-y: auto;
`;

export const ServiceList = styled.ul`
  padding-inline-start: 2rem;
`;
