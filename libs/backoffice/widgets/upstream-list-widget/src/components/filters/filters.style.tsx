import styled from 'styled-components';

import { Input, Button, Typography } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';

export const Container = styled.section`
  margin: 2.4rem 0;
`;

export const Actions = styled.div`
  padding: 0.4rem 0.4rem 0.4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
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

export const StyledButton = styled(Button)`
  &&& {
    padding: 0.8rem 3.2rem;
  }

  ${respondTo.down('sm')} {
    flex: 1;
  }
`;

export const StyledInput = styled(Input)`
  max-width: 42rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;

export const StyledText = styled(Typography.Paragraph)`
  line-height: 20px;
  margin: 0 1.6rem;
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
