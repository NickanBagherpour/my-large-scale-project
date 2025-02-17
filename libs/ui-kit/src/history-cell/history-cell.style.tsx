import styled, { css } from 'styled-components';

export const HistoryCellContainer = styled.span<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  .badge-wrapper {
    direction: ltr !important;
    display: flex;
    align-items: center;
  }

  .text {
    ${(p) =>
      !p.$isPersian && p.theme.direction === 'rtl'
        ? css`
            direction: rtl !important;
          `
        : css`
            direction: ltr !important;
          `}
    unicode-bidi: embed !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
