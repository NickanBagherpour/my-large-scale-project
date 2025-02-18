import { BorderedSection } from '@oxygen/reusable-components';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin-bottom: 4rem;
` as typeof AntForm;

export const Container = styled(BorderedSection)`
  display: flex;
  gap: 8rem;
  & > * {
    flex: 1;
  }
`;
