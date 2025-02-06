import styled from 'styled-components';
import { Divider as KitDivider } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Container = styled.section`
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.2rem;
  margin-bottom: 1.8rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: ${(p) => `1px solid ${p.theme.border._100}`};
  padding: 1.6rem 2.4rem;
  gap: 0.8rem;

  ${respondTo.down('sm')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

export const Tag = styled.p`
  color: ${(p) => p.theme.secondary._800};
  font-weight: 600;
  font-size: 1.2rem;
  background: ${(p) => p.theme.secondary._100};
  padding: 0.5rem 1.5rem;
  border-radius: 2.4rem;
  margin: 0;
`;

export const ServiceName = styled.h4`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(p) => p.theme.text.primary};
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1.6rem 3.6rem;
  gap: 1rem;

  ${respondTo.down('xl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${respondTo.down('md')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('sm')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-inline: 3.6rem;
`;

export const ItemName = styled.div`
  font-size: 1.2rem;
  margin: 0 0 0.2rem;
  font-weight: 600;
`;

export const ItemValue = styled.div`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 300;
  width: fit-content;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
  }
`;
