import { Divider } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const TitleContainer = styled.div`
  color: ${(p) => p.theme.error.main};
  align-items: center;
  display: flex;
  gap: 1rem;
  width: fit-content;
`;
export const Partition = styled.div`
  display: flex;
  gap: 3rem;
  flex-basis: 50%;
  width: max-content;
`;

export const InfoTitle = styled.div`
  font-weight: 600;
  word-wrap: nowrap;
  text-align: center;
  margin: auto;
`;
export const StyledDivider = styled(Divider)`
  height: 70px;
  border-color: ${(p) => p.theme.border._300};
`;
export const StyledText = styled.p`
  color: ${(p) => p.theme.error.main};
`;
export const CenteredText = styled.p`
  text-align: center;
`;
