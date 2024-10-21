import styled from 'styled-components';
import { HighlightColorType } from './mark-text';

type CustomStyleProps = {
  customStyle: HighlightColorType;
  fontSize?: string;
  fontWeight?: string;
  [key: string]: any;
};

export const StyledSpan = styled.span<CustomStyleProps>`
  color: ${(p) => {
    switch (p.customStyle) {
      case 'success':
        return p.theme.base.success;
      case 'warning':
        return p.theme.base.warning;
      case 'error':
        return p.theme.base.error;
      default:
        return p.customStyle;
    }
  }};

  font-size: ${(p) => p.fontSize || 'inherit'};
  font-weight: ${(p) => p.fontWeight || 'normal'};
  ${(p) => ({ ...p })}
`;
