import styled, { css } from 'styled-components';
import { Button } from '@oxygen/ui-kit';
import { StatusProps } from './animated-status';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(p) => p.theme.background._50};
  margin-bottom: 2.4rem;
  gap: 2.4rem;
  padding: 1.6rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: 1.2rem;
`;

export const Description = styled.div<{ status: StatusProps['status'] }>`
  ${(p) =>
    p.status === 'success'
      ? css`
          color: ${(p) => p.theme.secondary.main};
          margin: 0;
          font-size: 1.6rem;
          font-weight: 600;
        `
      : p.status === 'loading'
      ? css`
          color: ${(p) => p.theme.text.tertiary};
          margin: 0;
        `
      : css`
          color: ${(p) => p.theme.text.tertiary};
          white-space: break-spaces;
          text-align: center;
          font-size: 1.6rem;
          margin: 0;
          font-weight: 600;
        `};
`;

export const ProcessingMsg = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  margin: 0;
`;

export const SuccessMsg = styled.p`
  color: ${(p) => p.theme.secondary.main};
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const TopBtn = styled(Button)`
  /* margin-bottom: 0.8rem; */
`;

export const ErrorsList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const RequestError = styled.li`
  display: flex;
  align-items: center;
`;

// export const ErrMsg = styled.span`
// 	color: ${(p) => p.theme.text.primary};
// 	font-size: 1.2rem;
// 	margin-inline-end: 0.5rem;
// `;

export const ErrIcon = styled.i`
  color: ${(p) => p.theme.error.main};
  font-size: 2.4rem;
  margin-inline-end: 1rem;
`;

export const ErrCode = styled.span`
  color: ${(p) => p.theme.error.main};
  font-size: 1.2rem;
`;

export const ErrMsg = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.6rem;
  margin: 0;
  font-weight: 600;
`;
