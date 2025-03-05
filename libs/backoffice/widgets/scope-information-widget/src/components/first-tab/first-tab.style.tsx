import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';

export const Firststep = styled(Container)`
  display: flex;
  flex-direction: column;
`;
export const FirstStepHeader = styled.div`
  min-height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  ${respondTo.down('xs')} {
    flex-direction: column;
    align-items: start;
  }
`;
export const FirstStepTitle = styled.p`
  color: ${(p) => p.theme.text};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
  ${respondTo.down('xs')} {
  }
`;
