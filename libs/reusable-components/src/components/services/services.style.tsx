import styled from 'styled-components';
import { Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-inline: 0.8rem;
  margin-block: 2rem 1.6rem;

  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin-inline-end: auto;
  margin-block: 0;
`;

export const Icon = styled.i`
  font-size: 1.8rem;
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

export const DetailsBtn = styled(KitButton)`
  font-weight: 600;
`;

export const Btns = styled.div`
  display: flex;
  justify-content: space-between;
`;
