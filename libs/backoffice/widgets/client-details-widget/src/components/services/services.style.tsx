import styled from 'styled-components';
import { Table as KitTable, Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 5.4rem;
  margin-bottom: 1.8rem;

  ${respondTo.down('md')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  white-space: nowrap;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;
`;

export const StatusTxt = styled.p`
  margin: 0;
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  ${respondTo.down('md')} {
    && tr:nth-child(odd) {
      background-color: ${(p) => p.theme.primary._50};
    }
  }
`;

export const DetailsBtn = styled(KitButton)`
  font-weight: 600;
`;
