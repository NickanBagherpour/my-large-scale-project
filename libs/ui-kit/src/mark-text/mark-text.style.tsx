import styled from 'styled-components';
import { HighlightColorType } from './mark-text';

type CustomStyleProps = {
  $customStyle: HighlightColorType;
  fontSize?: string;
  fontWeight?: string;
  [key: string]: any;
};

export const StyledSpan = styled.span<CustomStyleProps>`
  color: ${(p) => {
    switch (p.$customStyle) {
      case 'success':
        return p.theme.success.main;
      case 'warning':
        return p.theme.warning.main;
      case 'error':
        return p.theme.error.main;
      default:
        return p.$customStyle;
    }
  }};

  font-size: ${(p) => p.fontSize || 'inherit'};
  font-weight: ${(p) => p.fontWeight || 'normal'};
  ${(p) => ({ ...p })}
`;
