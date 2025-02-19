import { respondTo } from '@oxygen/utils';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin-bottom: 4rem;
` as typeof AntForm;

export const Container = styled.section`
  display: flex;
  gap: 4rem;
  & > * {
    flex: 1;
  }
  ${respondTo.down('lg')} {
    flex-direction: column;
  }
`;
