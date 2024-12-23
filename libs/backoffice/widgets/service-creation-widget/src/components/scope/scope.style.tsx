import { Table as KitTable } from '@oxygen/ui-kit';
import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Table = styled(KitTable)`
  margin-top: 4rem;
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4rem;

  ${respondTo.down('md')} {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

export const Title = styled.h2`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 600;
`;
