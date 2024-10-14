import styled from 'styled-components';

import { cssVar } from '@oxygen/utils';

export const ErrorFallbackWrapper = styled.div<any>`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin: 2rem;
  border-radius: var(${cssVar.radius});
  //text-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.errorBackground};
    //box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const ErrorTitle = styled.span`
  margin-top: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;
export const ErrorDetail = styled.span`
  margin-top: 1.2rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

export const ButtonContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  gap: 2rem;
`;
