import Link from 'next/link';
import { TextPalette } from '@oxygen/types';
import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';

export const CardContainer = styled.div<{ $backgroundColor?: keyof TextPalette }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radiusLg});
  width: 100%;
  padding: 1rem;
  background-color: ${(p) => (p.$backgroundColor ? p.theme[p.$backgroundColor]._100 : 'inherit')};
  border: ${(p) => (!p.$backgroundColor ? '1px solid p.theme.border?._100' : '0')};
`;
export const HeaderTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
`;
export const HeaderIcon = styled.i<{ $iconColor?: string }>`
  margin-inline-end: 1.5rem;
  font-size: 2rem;
  color: ${(p) => p.$iconColor};
`;
export const HeaderContainer = styled.div`
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem !important;
`;
export const Number = styled.span<{ $color?: keyof TextPalette }>`
  color: ${(p) => (p.$color ? p.theme[p.$color]?.main : 'inherit')} !important;
  font-weight: 700;
  font-size: 2.4rem;
`;

export const CardLink = styled(Link)<{ $color?: keyof TextPalette }>`
  color: ${(p) => (p.$color ? p.theme[p.$color]?.main : 'inherit')} !important;
  font-weight: 700;
  font-size: 1.4rem;
  margin-inline-end: 1rem;
`;
export const ChildrenContainer = styled.div`
  flex-grow: 1;
`;
export const LinkHeader = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 0.5rem 0rem;
`;
