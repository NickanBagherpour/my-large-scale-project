import styled, { css } from 'styled-components';
import { MarkText, Button as UiKitButton } from '@oxygen/ui-kit';
import { looper } from '../../assets';

export const Button = styled(UiKitButton)<{ $isActive: boolean }>`
  border-radius: 1.8rem;
  padding: 1.4rem 1.6rem 2.4rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  text-decoration: none;
  transition: all 200ms;
  overflow: hidden;
  display: block;
  isolation: isolate;
  background-image: url('${looper}');
  background-size: contain;
  background-repeat: no-repeat;
  /*! @noflip */
  background-position: left bottom;

  &&& {
    /* overridding ant buttons styles */
    border: 1px solid;
    border-color: ${(p) => (p.$isActive ? p.theme.primary._400 : p.theme.border._300)};
    background-color: ${(p) => p.theme.background.main};
    filter: none;
    height: fit-content;

    &:hover {
      border-color: ${(p) => p.theme.primary._400};
      opacity: 1;
    }
  }
`;

export const Header = styled.header<{ $isHeaderLtr: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  ${(p) =>
    p.$isHeaderLtr &&
    css`
      /*! @noflip */
      direction: ltr;
    `};
`;

export const Title = styled(MarkText)`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Settings = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  text-align: start;
  color: ${(p) => p.theme.text.primary};
  margin: 0.5rem 0 0;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.6rem;
  & p {
    margin-block: 0;
  }
`;

export const StatusTxt = styled.p`
  margin-inline-end: auto;
  margin-inline-start: 0.4rem;
  color: ${(p) => p.theme.text.tertiary};
`;

export const Date = styled.p`
  margin-inline-start: 0.6rem;
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.2rem;
`;
