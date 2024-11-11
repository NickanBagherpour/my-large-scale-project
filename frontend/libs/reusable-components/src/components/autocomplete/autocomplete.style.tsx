import styled from 'styled-components';
import { MarkText } from '@oxygen/ui-kit';

export const Item = styled.div`
  display: flex;
  align-items: center;
  font-family: inherit;

  .popup:has(&) .ant-select-item-option {
    padding: 0.8rem 1.6rem;
    border-radius: 0.5rem;
  }

  .popup:has(&) .ant-select-item-option-active {
    background: ${(p) => p.theme.primary._50};
  }

  .popup:has(&) .ant-select-item-option-active .icon-plus {
    visibility: visible;
  }
`;

export const Title = styled(MarkText)`
  font-family: inherit;

  font-size: 1.6rem;
  margin: 0;
  color: ${(p) => p.theme.text.tertiary};
  font-weight: 400;
  margin-inline-end: 1.6rem;
`;

export const Subtitle = styled.span`
  font-family: inherit;

  color: ${(p) => p.theme.text.quaternary};
  margin-inline-end: auto;
  font-size: 1.2rem;
`;

export const Icon = styled.i`
  padding: 0.8rem;
  background: ${(p) => p.theme.secondary.main};
  border-radius: 50%;
  color: ${(p) => p.theme.background.main};
  font-size: 2rem;
  margin-inline-end: 1.5rem;
  visibility: hidden;
`;
