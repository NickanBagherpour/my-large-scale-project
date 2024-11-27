import styled from 'styled-components';
import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import ReturnButton from '../return-button/return-button';

export const ContentContainer = styled.div`
  display: grid;
  margin: 1rem;
  height: 100%;
  padding: 0 5%;
  gap: 5%;
  grid-template-columns: auto auto;
  ${respondTo.down('lg')} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }
`;
export const AnimationContainer = styled.div`
  ${respondTo.down('lg')} {
    grid-row: 1/2;
    display: 'flex';
    width: 250px;
  }
`;
export const TextContainer = styled.div`
  padding-top: 16vh;
  flex: 1 1;
  display: flex;
  flex-flow: column nowrap;
  ${respondTo.down('lg')} {
    padding-top: 2rem;
  }
`;
export const ButtonGroupContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
`;
const minBtnWidth = '10rem';
export const StyledButton = styled(Button)`
  min-width: ${minBtnWidth};
`;
export const StyledReturnButton = styled(ReturnButton)`
  min-width: ${minBtnWidth};
`;
export const StyledText = styled.span<{
  $fontSize?: string;
  $fontWeight?: number;
  $lineHeight?: number;
  $color?: string;
}>`
  font-size: ${(p) => p.$fontSize};
  font-weight: ${(p) => p.$fontWeight};
  line-height: ${(p) => p.$lineHeight};
  color: ${(p) => p.$color};
`;
