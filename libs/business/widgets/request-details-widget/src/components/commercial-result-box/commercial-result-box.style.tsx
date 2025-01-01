import styled from 'styled-components';
import { Box } from '@oxygen/ui-kit';

export const StyledBox = styled(Box)`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  color: ${(p) => p.theme.text.secondary};
  align-items: center;
  //margin-bottom: 2.4rem;

  & svg {
    width: auto;
  }
`;

export const StyledTitle = styled.h2`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5rem;
  margin: 0 0 2.4rem;
`;
