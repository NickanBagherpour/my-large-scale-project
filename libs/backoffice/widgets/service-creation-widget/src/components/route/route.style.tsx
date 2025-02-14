import { Form as AntForm } from 'antd';
import styled from 'styled-components';
import Box from '../box/box';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin-bottom: 4rem;
` as typeof AntForm;

export const Container = styled(Box)`
  display: flex;
  gap: 4rem;

  & > * {
    flex: 1;
  }
`;
