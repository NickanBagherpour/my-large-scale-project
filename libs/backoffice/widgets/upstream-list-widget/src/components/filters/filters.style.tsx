import styled from 'styled-components';

import { Input, Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';

export const Container = styled.section`
  margin: 2.4rem 0;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
  align-items: end;
  gap: 1.2rem;
  padding: 0.4rem 0.4rem 0.4rem 0;

  ${respondTo.down('sm')} {
    grid-template-columns: 1fr;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const StyledButton = styled(Button)`
  justify-self: end;

  &&& {
    padding: 0.8rem 3.2rem;
  }

  ${respondTo.down('md')} {
    width: 100%;
  }
`;
export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;
export const StyledInput = styled(Input)`
  max-width: 42rem;
  margin-inline-end: auto;

  & i {
    font-size: 1.8rem;
  }

  ${respondTo.down('lg')} {
    max-width: 100%;
  }
`;
