import styled from 'styled-components';
import { Box, Button, Modal } from '@oxygen/ui-kit';

export const StyledModal = styled(Modal)`
  & .ant-modal-content {
    padding: 3.2rem;
    max-width: 50rem;
    max-height: 30rem;

    & .ant-modal-body {
      margin: 0;
    }
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

export const StatusBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;

  background-color: ${(p) => p.theme.background._50};
  color: ${(p) => p.theme.text.tertiary};
  border-radius: 1.2rem;
  border: 1px solid ${(p) => p.theme.border.main};

  padding: 2rem 2.8rem;
  width: 100%;
  height: 100%;
  max-height: 16rem;
`;
export const StyledIcon = styled.span<{ isConfirm?: boolean }>`
  max-height: 7.4rem;
  text-align: center;

  & i {
    font-size: 7.4rem;
    color: ${(p) => (p.isConfirm ? p.theme.secondary.main : p.theme.error.main)};
  }
`;

export const StyledDescription = styled.span`
  margin: 0;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem;
  color: ${(p) => p.theme.text.tertiary};
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 5.2rem;
  max-height: 5.2rem;
`;
