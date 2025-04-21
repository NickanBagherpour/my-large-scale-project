import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.div<{ $color: string }>`
  background-color: ${(p) => p.theme[p.$color]._50};
  border-radius: var(${cssVar.radiusLg});
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Link = styled.div<{ $color: string }>`
  background-color: ${(p) => p.theme[p.$color].main};
  height: 4rem;
  width: 4rem;
  border-radius: 1000px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled.i<{ $color: string }>`
  color: ${(p) => p.theme[p.$color].main};
  font-size: 1.9rem;
`;
export const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
`;
export const Subtitle = styled.span`
  font-size: 1.2rem;
`;
export const Body = styled.div<{ $color: string }>`
  background-color: ${(p) => p.theme[p.$color]._100};
  border-radius: var(${cssVar.radius});
  padding: 1rem 2rem 3rem 1rem;
`;
export const BaseFlag = styled.div`
  border-radius: 10000px;
  width: 0.8rem;
  height: 0.8rem;
  border: 3px solid;
  box-sizing: content-box;
`;
export const ActiveFlag = styled(BaseFlag)`
  background-color: ${(p) => p.theme.secondary.main};
  border-color: ${(p) => p.theme.secondary._200};
`;
export const InactiveFlag = styled(BaseFlag)`
  background-color: ${(p) => p.theme.error.main};
  border-color: ${(p) => p.theme.dashboard.lightRed};
`;
export const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
`;
export const SubText = styled.span`
  font-size: 14px;
`;
export const Total = styled.span<{ $color: string }>`
  font-weight: 700;
  font-size: 24px;
  color: ${(p) => p.theme[p.$color].main};
`;
