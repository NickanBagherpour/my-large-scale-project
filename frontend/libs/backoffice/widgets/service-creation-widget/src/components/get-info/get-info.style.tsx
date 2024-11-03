import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Form = styled(AntForm)`
  & label {
    padding-inline-start: 1rem;
    margin-bottom: 0.4rem;
  }
`;
