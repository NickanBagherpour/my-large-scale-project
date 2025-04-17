import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.article`
  border-radius: var(${cssVar.radiusLg});
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  background: ${(p) => p.theme.background._50};
  padding: 2.4rem;
  margin: 2.4rem 0 2.4rem;
  display: flex;
  align-items: end;

  ${respondTo.down('sm')} {
    flex-direction: column;
    align-items: start;
    gap: 2.4rem;
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  flex: 1;

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('md')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Key = styled.span`
  font-size: 1.2rem;
  color: ${(p) => p.theme.text.tertiary};
`;

export const Value = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(p) => p.theme.text.secondary};
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: ${(p) => `1px solid ${p.theme.secondary.main}`};
  border-radius: 1rem;
  padding-block: 1.2rem;
  padding-inline-start: 1.6rem;
  padding-inline-end: 8rem;
  background: ${(p) => p.theme.background.main};
`;

export const TotalTitle = styled.span`
  font-weight: 700;
`;

export const Count = styled.span`
  color: ${(p) => p.theme.secondary.main};
  font-size: 2.4rem;
  font-weight: 700;
`;

export const Icon = styled.i`
  color: ${(p) => p.theme.warning.main};
  font-size: 2rem;
`;

export const Name = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.4rem;
`;
