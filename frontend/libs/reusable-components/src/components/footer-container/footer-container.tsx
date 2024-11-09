import { respondTo } from '@oxygen/utils';

import styled from 'styled-components';

const FooterContainer = styled.div<any>`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  border-top: 1px solid ${(p) => p.theme.border._100};
  padding: 1.6rem 0.4rem;

  ${respondTo.down('sm')} {
    flex-direction: column;

    .ant-btn,
    button {
      &:first-child {
        order: 1;
      }
    }
  }
`;

export default FooterContainer;
