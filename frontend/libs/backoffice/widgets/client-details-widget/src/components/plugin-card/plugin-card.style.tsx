import { Button } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const Card = styled.div<{ isChecked: boolean }>`
  flex-basis: 22.8rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  background: ${(p) => (p.isChecked ? p.theme.primary._50 : p.theme.background._50)};
  transition: background-color 200ms;
  border-radius: 1.2rem;
  padding: 0.8rem 1rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardName = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
`;

export const SettingBtn = styled(Button)`
  display: block;
  margin-inline-start: auto;

  &:disabled > i {
    color: ${(p) => p.theme.border.main};
  }
`;

export const Icon = styled.i`
  font-size: 2rem;
`;
