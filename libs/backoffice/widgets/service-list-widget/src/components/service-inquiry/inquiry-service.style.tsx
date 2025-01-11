import styled from 'styled-components';
import { ContentType } from './inquiry-service';
import { Modal } from '@oxygen/ui-kit';

export const MainContainer = styled.div<{ $content: ContentType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.6rem;
  background-color: ${(p) => (p.$content === 'searching' ? p.theme.background._100 : p.theme.info._50)};
  border: 1px solid ${(p) => p.theme.primary.main};
  width: 100%;
  padding: 1.2rem;
  min-height: 30rem;
`;
export const ResponsiveModal = styled(Modal)`
  min-width: 290px;
`;
