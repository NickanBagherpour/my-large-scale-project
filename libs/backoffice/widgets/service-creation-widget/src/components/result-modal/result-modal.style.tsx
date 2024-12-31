import styled from 'styled-components';
import Box from '../box/box';
import { Button } from '@oxygen/ui-kit';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(p) => p.theme.background._50};
  margin-bottom: 2.4rem;
  gap: 2.4rem;
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

export const ErrMsg = styled.span`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.2rem;
  margin-inline-end: 0.5rem;
`;

export const ErrIcon = styled.i`
  color: ${(p) => p.theme.error.main};
  font-size: 2.4rem;
  margin-inline-end: 1rem;
`;

export const ErrCode = styled.span`
  color: ${(p) => p.theme.error.main};
  font-size: 1.2rem;
`;

export const ConnectionErrMsg = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.6rem;
  margin: 0;
  font-weight: 600;
`;
