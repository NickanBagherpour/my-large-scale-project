import styled from 'styled-components';

import { Container, MarkText } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const DraftsContainer = styled(Container)`
  margin-bottom: 1.6rem;
`;

export const UpstreamDetailsContainer = styled(Container)`
  padding-bottom: 2rem;
  height: 100%;

  & .table-container {
    flex: 1;
    min-height: 45rem;
  }

  & [class*='container-style__Divider'] {
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.border._100};
  }
`;

export const FooterContainer = styled.div<any>`
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid ${(p) => p.theme.border._100};
  padding: 1.6rem 0;
  gap: 1.6rem;
  background-color: ${(props) => props.theme.background.main};
  flex: 0 0 auto;

  @media print {
    display: none;
  }

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  ${respondTo.down('lg')} {
    width: calc(100% - 3rem);
  }

  & .ant-btn.return-button {
    border-color: ${(props) => props.theme.border.main};
    min-width: 12.8rem;
  }

  & .ant-btn.register-button {
    min-width: 12.8rem;
  }
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
  align-items: center;

  .delete-modal {
    background-color: red;
  }
`;

export const ServiceName = styled(MarkText)`
  margin: 0.4rem;
`;

export const InfoItemsContainer = styled.div`
  // user input values
  --grid-layout-gap: 1.4rem;
  --grid-column-count: 1; /* This gets overridden by an inline style. */
  --grid-item--min-width: 12rem; /* This gets overridden by an inline style. */

  // calculated values
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr);
  grid-template-columns: repeat(var(--grid-column-count), 1fr);
  grid-column-gap: var(--grid-layout-gap);

  ${respondTo.down('lg')} {
    grid-template-columns: 1fr 1fr;
  }

  ${respondTo.down('xs')} {
    grid-template-columns: 1fr;
  }
`;

export const InfoItemsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  span.info-items-title {
    flex: 1;
    font-weight: 400;
    line-height: 2rem;
    color: ${(props) => props.theme.border.main};
  }

  .ant-form-item {
    flex: 2;
    margin: 0;
  }
`;
