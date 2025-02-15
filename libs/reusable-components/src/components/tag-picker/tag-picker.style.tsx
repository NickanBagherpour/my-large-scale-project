import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Chip as UikitChip } from '@oxygen/ui-kit';
import { type CSSProperties } from 'react';

export const Container = styled.div<{ $dropdownMinWidth: CSSProperties['width'] }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem 1.6rem;

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  /* dropdown container: */
  & > div:first-child {
    margin: 0;
    padding: 0 1.6rem 0 0;
    border-inline-end: 1px solid ${(p) => p.theme.border.main};
    width: min-content;

    ${respondTo.down('xs')} {
      width: 100%;
      border-right: none;
      padding: 0;
    }
  }

  .ant-btn {
    min-width: ${(p) => p.$dropdownMinWidth};
    ${respondTo.down('xs')} {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export const Chip = styled(UikitChip)`
  && {
    margin: 0;

    ${respondTo.down('xs')} {
      justify-content: space-between;
    }
  }
` as typeof UikitChip;
