import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Header = styled.header`
  margin: 1.4rem 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${respondTo.down('lg')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

export const SettingsIcon = styled.i`
  font-size: 2rem;
`;

export const Title = styled.p`
  font-size: 1.6rem;
  color: ${(p) => p.theme.text.primary};
  font-weight: 500;
  font-style: normal;
  padding-inline-start: 1rem;
  line-height: 2.5rem;
`;
