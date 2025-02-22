import styled from 'styled-components';
import { Box, Button, Modal as UikitModal, Divider as UikitDivider } from '@oxygen/ui-kit';
import { Form } from 'antd';

export const StyledModal = styled(UikitModal)`
  .ant-modal-body {
    margin: 0;
    padding: 0;
  }
  .ant-modal-content {
    padding: 1.6rem;
    border-radius: 2.7rem;
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
` as typeof UikitModal;

export const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  //padding: 0 2.4rem;
`;

export const Divider = styled(UikitDivider)`
  margin: 1.6rem 0;
`;
export const StyledTitle = styled('span')`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 3rem;
  padding: 0.8rem;
`;
export const StyledCloseIcon = styled('i')`
  font-size: 2.4rem;
  //padding:0.5rem;
  color: ${(p) => p.theme.iconPrimary};
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledContainer = styled('div')`
  //padding: 2.4rem;
`;
export const DeleteResultContainer = styled('div')`
  padding: 1.6rem;
`;
export const StyledForm = styled(Form)`
  .ant-form-item:not(:last-of-type) {
    margin-bottom: 3rem;
  }
  .ant-form-item:last-of-type {
    margin-bottom: 4rem;
  }

  .ant-form-item-row {
    align-items: center;
  }
` as typeof Form;

export const StyledButton = styled(Button)`
  min-height: 5.6rem;
  width: 100%;
  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  line-height: 2.5rem;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.6rem;
  font-weight: 600;

  .delete-modal {
    background-color: red;
  }

  .ant-modal-title {
    font-weight: 700;
  }
`;

export const TableContainer = styled.div`
  margin-bottom: 1.6rem;

  div.ant-table {
    min-height: fit-content;
  }
`;
