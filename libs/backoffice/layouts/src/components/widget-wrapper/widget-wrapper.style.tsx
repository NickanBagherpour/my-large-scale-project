'use client';

import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: transparent;
  gap: 1.6rem;
  padding: 1.6rem;

  @media (min-width: ${cssVar.maxWidth}) {
    padding-inline-end: 0;
  }
`;
