import styled from 'styled-components';
import { Form } from 'antd';
import { Box, Divider, Modal as UikitModal, Button } from '@oxygen/ui-kit';
import { BorderedSection } from '@oxygen/reusable-components';
import { respondTo } from '@oxygen/utils';

export const StyledModal = styled(UikitModal)`
  width: auto !important;
  max-width: 89rem !important;
  //min-width: 89rem !important;

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

  .ant-modal-close {
    top: 2rem;
  }

  & .ant-btn {
    min-height: 6rem;
    padding: 0 3rem;
  }

  .ant-modal-footer {
    ${respondTo.down('md')} {
      flex-direction: column;
    }
  }
`;

export const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 0 2.4rem;
`;
export const StyledDivider = styled(Divider)`
  margin-bottom: 1.6rem;
`;

export const StyledTitle = styled('span')`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 3rem;
`;
export const StyledCloseIcon = styled('i')`
  font-size: 3rem;
  color: ${(p) => p.theme.iconPrimary};
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

export const InputsBox = styled(BorderedSection)`
  margin-bottom: 1.6rem;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1.6rem;
  column-gap: 1.6rem;

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('md')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Icon = styled.i`
  font-size: 1.8rem;
  color: ${(p) => p.theme.primary.main};
`;

export const StyledForm = styled(Form)`
  .ant-form-item-control {
    input {
      //height: 4rem;
      max-height: 4rem;
    }
  }

  .ant-input-outlined {
    align-items: center;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-col {
    max-width: 100%;
  }

  .ant-picker {
    width: 100%;
    height: 4rem;
    max-height: 4rem;
    border-radius: 0.8rem;

    & svg,
    i {
      width: 1.8rem;
      height: 1.8rem;
      color: ${(p) => p.theme.text.quaternary};
    }
  }

  .ant-picker-focused .rotate-icon {
    transform: rotate(180deg);
  }
` as typeof Form;

export const RegisterButton = styled(Button)`
  margin-bottom: 0.6rem;

  ${respondTo.down('lg')} {
    margin-bottom: 0.4rem;
  }

  ${respondTo.down('md')} {
    order: -1;
  }
`;
