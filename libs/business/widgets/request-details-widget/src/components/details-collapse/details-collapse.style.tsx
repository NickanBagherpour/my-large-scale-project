import styled from 'styled-components';
import { Button, Divider } from '@oxygen/ui-kit';

export const StyledContainer = styled.div`
  padding: 1.2rem 3.2rem 3.2rem 3.2rem;
  background-color: ${(p) => p.theme.background._50};
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 2.4rem;

  & h2:not(:first-child) {
    margin-top: 2.4rem;
  }

  margin-top: 1.6rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  i {
    font-size: 2.4rem;
    color: ${(p) => p.theme.background.main};
  }
`;

export const CollapseTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  gap: 1.6rem;

  i.status-icon {
    margin: 0.3rem 0.2rem;
    font-size: 2rem;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 50%;
`;
export const StyledDivider = styled(Divider)`
  border-color: ${(p) => p.theme.border.main};
`;
