import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';
import { Form as AntForm } from 'antd';
import { Button as KitButton, Input as KitInput, Modal } from '@oxygen/ui-kit';

export const FilterContainer = styled.section`
  margin-top: 2.4rem;
`;

export const Form = styled(AntForm)`
  width: 100%;

  div.ant-form-item {
    margin-bottom: 0;
  }
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;

export const Button = styled(KitButton)`
  &&& {
    font-size: 1.4rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 3.4rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const UploadModal = styled(Modal)``;
