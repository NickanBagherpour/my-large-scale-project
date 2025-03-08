import styled, { css } from 'styled-components';
import { gold } from '../../utils';
import { TariffType } from '../../type';

export const RadioRow = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const RadioTitle = styled.h3`
  color: ${(p) => p.theme.text.primary};
  margin: 0;
`;

export const DisabledTxt = styled.p`
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  font-size: 1.2rem;
`;

export const DisabledTitle = styled.h3`
  color: ${(p) => p.theme.text.primary};
  margin: 0 0 0.4rem;
  font-size: 1.4rem;
`;

export const Badge = styled.div<{ $type: TariffType | null | undefined }>`
  border-radius: 2.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 1rem;
  width: fit-content;

  i {
    font-size: 2.4rem;
  }

  background: ${(p) => {
    const { theme, $type } = p;
    switch ($type) {
      case 'fixed':
        return theme.primary._50;
      case 'tiered':
        return theme.primary._50;
      case 'special':
        return gold.bg;
    }
  }};
`;

export const Label = styled.label<{ $checked: boolean; $type: TariffType | null | undefined }>`
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

    switch ($type) {
      case 'fixed': {
        return css`
          border: 1px solid ${theme.primary.main};
          background: ${theme.primary._50};

          .ant-radio-inner {
            border-color: #4f46e5;
            background-color: #4f46e5;
          }
        `;
      }

      case 'tiered': {
        return css`
          border: 1px solid ${p.theme.secondary.main};
          background: ${theme.primary._50};

          .ant-radio-inner {
            border-color: ${p.theme.secondary.main};
            background-color: ${p.theme.secondary.main};
          }
        `;
      }

      case 'special': {
        return css`
          border: 1px solid ${gold.dark};
          background: ${gold.bg};

          .ant-radio-inner {
            border-color: ${gold.dark};
            background-color: ${gold.dark};
          }
        `;
      }
    }
  }}
`;

export const Icon = styled.i<{ $type: TariffType | null | undefined }>`
  font-size: 2.4rem;
  color: ${(p) => {
    const {
      theme: { primary, secondary },
      $type,
    } = p;

    switch ($type) {
      case 'fixed':
        return primary.main;
      case 'tiered':
        return secondary.main;
      case 'special':
        return gold.normal; /* TODO: USE  A THEME COLOR FOR THIS */
    }
  }};
`;

export const Txt = styled.span`
  margin-inline-end: auto;
`;
