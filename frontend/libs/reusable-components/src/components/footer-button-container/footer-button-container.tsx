import { cssVar, respondTo } from '@oxygen/utils';

import styled from 'styled-components';

const FooterButtonContainer = styled.div<any>`
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid ${(p) => p.theme.base.border};
  margin-left: calc(var(${cssVar.drawerWidth}));
  width: calc(100% - var(${cssVar.drawerWidth}) - 3rem);
  bottom: 0;
  right: 0;
  margin-right: 1.5rem;
  padding: 1.6rem;
  gap: 1.6rem;
  position: absolute;
  margin-bottom: 1.5rem;

  @media print {
    display: none;
  }

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  ${respondTo.down('lg')} {
    width: calc(100% - 3rem);
  }
`;

export default FooterButtonContainer;
