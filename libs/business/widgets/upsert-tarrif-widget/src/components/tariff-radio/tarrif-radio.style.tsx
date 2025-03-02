import styled, { css } from 'styled-components';
import { Value } from './tarrif-radio';

const gold = {
  bg: '#FFFBEB',
  dark: '#D97706',
  normal: '#F59E0B',
};

export const Label = styled.label<{ $checked: boolean; $type: Value }>`
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 19.4rem;
  padding: 1.4rem 2.4rem;

  i {
    font-size: 2.4rem;
  }

  ${(p) => {
    const { theme, $checked, $type } = p;
    if (!$checked) return;

    if ($type === 'fixed') {
      return css`
        border: 1px solid ${theme.primary.main};
        background: ${theme.primary._50};

        .ant-radio-inner {
          border-color: #4f46e5;
          background-color: #4f46e5;
        }
      `;
    } else if ($type === 'tiered') {
      return css`
        border: 1px solid ${p.theme.secondary.main};
        background: ${theme.primary._50};

        .ant-radio-inner {
          border-color: ${p.theme.secondary.main};
          background-color: ${p.theme.secondary.main};
        }
      `;
    } else {
      return css`
        border: 1px solid ${gold.dark};
        background: ${gold.bg};

        .ant-radio-inner {
          border-color: ${gold.dark};
          background-color: ${gold.dark};
        }
      `;
    }
  }}
`;

export const Icon = styled.i<{ $value: Value }>`
  font-size: 2.4rem;
  color: ${(p) =>
    p.$value === 'fixed'
      ? p.theme.primary.main
      : p.$value === 'tiered'
      ? p.theme.secondary.main
      : '#F59E0B'}; /* USE  A THEME COLOR FOR THIS */
`;

export const Txt = styled.span`
  margin-inline-end: auto;
`;
