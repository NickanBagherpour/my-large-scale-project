import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';

export const Header = styled.header`
  margin-bottom: 1.6rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  color: ${(p) => p.theme.text.primary};
  font-weight: 600;
  margin: 0;
  padding-inline-start: 0.8rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Input = styled(KitInput)`
  width: 50%;
`;

export const SettingsIcon = styled.i`
  font-size: 2rem;
`;

export const SearchIcon = styled.i`
  font-size: 1.8rem;
`;
