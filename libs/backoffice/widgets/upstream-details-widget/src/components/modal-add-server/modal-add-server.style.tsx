import styled from 'styled-components';
import { Box, Button, Divider as UikitDivider, Modal as UikitModal } from '@oxygen/ui-kit';
import { Form } from 'antd';

export const StyledModal = styled(UikitModal)`
  .ant-modal-body {
    margin: 0;
    padding: 0;
  }
  .ant-modal-content {
    padding: 2.4rem 1.6rem 3.2rem 1.6rem;
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
` as typeof UikitModal;

export const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0 2.4rem;
`;

export const StyledTitle = styled('span')`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 3rem;
`;
export const StyledCloseIcon = styled('i')`
  font-size: 2.4rem;

  color: ${(p) => p.theme.iconPrimary};
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

export const Divider = styled(UikitDivider)`
  margin-bottom: 3.4rem;
`;
export const StyledContainer = styled('div')`
  padding: 0 2.6rem;
`;
export const StyledForm = styled(Form)`
  .ant-form-item:not(:last-of-type) {
    margin-bottom: 3rem;
  }
  .ant-form-item:last-of-type {
    margin-bottom: 4rem;
  }

  .ant-form-item-label {
    line-height: 4rem;
  }

  //.ant-form-item-row {
  //  align-items: center;
  //}
` as typeof Form;

export const StyledButton = styled(Button)`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`;
