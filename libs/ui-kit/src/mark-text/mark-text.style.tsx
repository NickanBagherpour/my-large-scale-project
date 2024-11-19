import styled from 'styled-components';
import { HighlightColorType } from './mark-text';

type CustomStyleProps = {
  custom_style: HighlightColorType;
  font_size?: string;
  font_weight?: string;
  [key: string]: any;
};

export const StyledSpan = styled.span<CustomStyleProps>`
  color: ${(p) => {
    switch (p.custom_style) {
      case 'success':
        return p.theme.success.main;
      case 'warning':
        return p.theme.warning.main;
      case 'error':
        return p.theme.error.main;
      default:
        return p.custom_style;
    }
  }};

  font-size: ${(p) => p.font_size || 'inherit'};
  font-weight: ${(p) => p.font_weight || 'normal'};
  ${(p) => ({ ...p })}
`;
