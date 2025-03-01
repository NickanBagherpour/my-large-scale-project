import { Modal, MarkText as UikitMarkText } from '@oxygen/ui-kit';
import styled, { css } from 'styled-components';

export const ResponsiveModal = styled(Modal)`
  // min-width: 290px;
`;
export const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.5rem;
  color: ${(p) => p.theme.text.primary};
  max-height: 15rem;
  overflow-y: auto;
`;
export const ClientList = styled.ul`
  padding-inline-start: 2rem;
`;

const modalDescription = css`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const Title = styled.h3`
  ${modalDescription}
`;
export const MarkText = styled(UikitMarkText)`
  ${modalDescription}
`;
