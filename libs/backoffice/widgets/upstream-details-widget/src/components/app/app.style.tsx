import styled from 'styled-components';

import { Container, MarkText, Steps as OxegenSteps, Box } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const DraftsContainer = styled(Container)`
  margin-bottom: 1.6rem;
`;

export const WidgetContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const UpstreamDetailsContainer = styled(Container)`
  max-height: fit-content;
  && .table-container {
    flex: 1;
    height: 100%;
  }
`;

export const BoxContainer = styled(Box)`
  height: 100%;
  flex-grow: 1;
`;

export const UpstreamDetailsContent = styled.div`
  height: 100%;
  margin-top: 2.4rem;
`;

export const Steps = styled(OxegenSteps)`
  margin-top: 2.4rem;
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  line-height: 2.5rem;
  align-items: center;

  .delete-modal {
    background-color: red;
  }

  .ant-modal-title {
    font-weight: 700;
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
