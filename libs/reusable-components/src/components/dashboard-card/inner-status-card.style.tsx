import { TextPalette } from '@oxygen/types';
import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.div<{ $backgroundColor?: keyof TextPalette }>`
  display: flex;
  background-color: ${(p) => (p.$backgroundColor ? p.theme[p.$backgroundColor]._200 : 'inherit')};
  padding: 2rem;
  border-radius: var(${cssVar.radius});
  height: 100%;
`;
export const ActiveFlag = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background-color: ${(p) => p.theme.secondary.main};
  box-shadow: 0px 0px 3px 3px ${(p) => p.theme.secondary._200};
`;
export const DeactiveFlag = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 3px;
  background-color: ${(p) => p.theme.error.main};
  box-shadow: 0px 0px 3px 3px ${(p) => p.theme.error._300};
`;
