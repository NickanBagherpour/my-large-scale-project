import { Button, InfoBox as UiKitInfoBox } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const FirstStepHeader = styled.div`
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
export const FirstStepTitle = styled.p`
  color: ${(p) => p.theme.text};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;
export const Icon = styled.i`
  font-size: large;
`;
export const InfoBox = styled(UiKitInfoBox)`
&.info-box-style{
    background-color: red;
    margin: 0;
    padding:0;
}
`;
