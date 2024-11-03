import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Header = styled.header`
  margin-bottom: 1.6rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  color: ${(p) => p.theme.text.primary};
  font-weight: 600;
  margin: 0;
  padding-inline-start: 1.5rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

export const Input = styled(KitInput)`
  width: 50%;

  ${respondTo.down('lg')} {
    width: 100%;
  }
`;

export const SettingsIcon = styled.i`
  font-size: 2rem;
`;

export const SearchIcon = styled.i`
  font-size: 1.8rem;
`;
