import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Form = styled(AntForm)`
  padding: 1.6rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: 0.5rem;

  & label {
    padding-inline-start: 1rem;
    margin-bottom: 0.4rem;
  }
`;
