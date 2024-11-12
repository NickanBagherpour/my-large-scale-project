import { Button, InfoBox as UiKitInfoBox } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
export const Firststep = styled.div`
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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  ${respondTo.down('xs')} {
    flex-direction: column;
    width: 100%;
  }
`;
export const Icon = styled.i`
  font-size: large;
`;
export const InfoBox = styled.div`
  &.info-box-style {
    background-color: red;
    margin: 0;
    padding: 0;
  }
`;
