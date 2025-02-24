import styled from 'styled-components';
import { Modal } from '@oxygen/ui-kit';
import { withOpacity } from '@oxygen/utils';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 1.6rem;

    .ant-modal-close {
      height: 2.4rem;
      width: 2.4rem;
      padding: 0;
      top: 1.6rem;
      right: 1.6rem;
    }

    .ant-modal-header {
      padding: 0;

      .ant-modal-title {
        padding: 0.8rem;
      }
    }
  }

  .ant-modal-body {
    margin: 0;
  }

  .ant-divider {
    margin: 1.6rem 0;
  }
  .ant-modal-footer {
    margin-top: 1.2rem;
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
  width: 100%;
`;

export const ServiceList = styled.ul`
  //padding-inline-start: 2rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ListItem = styled.li`
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;

  &:not(:first-of-type) {
    padding-top: 1rem;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(p) => p.theme.border._100};
  }

  & button {
    min-width: fit-content;
  }

  & i {
    font-size: 1.8rem;
  }
`;
