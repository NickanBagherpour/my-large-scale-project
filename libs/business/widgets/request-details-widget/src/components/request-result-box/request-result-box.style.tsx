import styled from 'styled-components';
import { Button } from 'antd';
import { withOpacity } from '@oxygen/utils';
import { Box } from '@oxygen/ui-kit';

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
  margin-bottom: 2.4rem;

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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;

  button {
    border-radius: 1.2rem;
    display: flex;
    max-height: 137px;
    padding: 6.8rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 25px;
  }
`;
export const RejectButton = styled(Button)`
  border: 1px solid ${(p) => p.theme.error._300};
  background: ${(p) => p.theme.error._100};
  color: ${(p) => p.theme.error.main};

  &:hover {
    border: 1px solid ${(p) => p.theme.error._600};
    background: ${(p) => p.theme.error._100};
    color: ${(p) => p.theme.error._600};
  }

  &:active {
    border: 1px solid ${(p) => p.theme.error._600};

    background: ${(p) => withOpacity(p.theme.error._300, 60)};
    color: ${(p) => p.theme.error._600};
  }
`;

export const ConfirmButton = styled(Button)`
  border: 1px solid ${(p) => p.theme.success._300};
  background: ${(p) => p.theme.secondary._100};
  color: ${(p) => p.theme.secondary._600};

  &:hover {
    border: 1px solid ${(p) => p.theme.success._600};
    background: ${(p) => p.theme.secondary._100};
    color: ${(p) => p.theme.secondary._700};
  }

  &:active {
    border: 1px solid ${(p) => p.theme.success._600};
    background: ${(p) => p.theme.secondary._200};
    color: ${(p) => p.theme.secondary._700};
  }
`;
