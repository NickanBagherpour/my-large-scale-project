import styled from 'styled-components';
import { Input as KitInput, Table as KitTable, Button as KitButton } from '@oxygen/ui-kit';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 5.4rem;
  margin-bottom: 1.8rem;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  white-space: nowrap;
`;

export const Input = styled(KitInput)`
  height: 4rem;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  align-self: center;
  justify-content: center;
`;

export const StatusTxt = styled.p`
  color: ${(p) => p.theme.text.quaternary};
  font-weight: 600;
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }
`;

export const DetailsBtn = styled(KitButton)`
  font-weight: 600;
`;
