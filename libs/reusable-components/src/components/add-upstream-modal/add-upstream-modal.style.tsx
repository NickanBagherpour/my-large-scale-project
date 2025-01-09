import styled from 'styled-components';
import { ConfirmModal } from '@oxygen/reusable-components';
import { Form } from 'antd';

export const StyledModal = styled(ConfirmModal)`
  .ant-modal-content {
    padding: 2.4rem 1.6rem 4.8rem 1.6rem;
    border-radius: 2.7rem;
  }

  .ant-modal-footer {
    margin: 0 2.5rem;
  }

  .ant-modal-header {
    padding-inline-start: 2.6rem;
  }

  .close-button {
    inset-inline-end: 35px;
  }

  .ant-modal-close {
    top: 2rem;
  }

  & .ant-btn {
    width: 100%;
    min-height: 5.6rem;
  }
`;

export const StyledForm = styled(Form)`
  padding: 0 2.6rem;

  .ant-form-item:not(:last-of-type) {
    margin-bottom: 3rem;
  }
  .ant-form-item:last-of-type {
    margin-bottom: 4rem;
  }
` as typeof Form;
