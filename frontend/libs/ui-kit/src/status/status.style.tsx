import styled, { css } from 'styled-components';

export type StatusType = 'active' | 'inactive';

export const Status = styled.div<{ status: StatusType }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  box-sizing: content-box;
  ${(p) =>
    p.status === 'inactive'
      ? css`
          background: ${(p) => p.theme.error.main};
          border: ${(p) => `0.2rem solid ${p.theme.error._300}`};
        `
      : css`
          background: ${(p) => p.theme.secondary.main};
          border: ${(p) => `0.2rem solid ${p.theme.secondary._200}`};
        `};
`;
