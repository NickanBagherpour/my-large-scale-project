import React, { CSSProperties } from 'react';

import { useAppTheme } from '@oxygen-portal/hooks';
import { BasicComponentProps } from '@oxygen-portal/types';

import * as S from './text.style';

type VariantType = 'heading' | 'subhead' | 'title' | 'body' | 'subtitle';

export type TextProps = BasicComponentProps & {
  variant?: VariantType;
  fontWeight?: CSSProperties['fontWeight'];
  fontSize?: string;
  color?: CSSProperties['color'];
  margin?: CSSProperties['margin'];
  lineHeight?: number;
  // children?: ReactNode;
  as?: React.ElementType;
};

export type $TextProps = TextProps & {
  $fontWeight?: CSSProperties['fontWeight'];
  $fontSize?: CSSProperties['fontSize'];
  $margin?: CSSProperties['margin'];
  $color?: CSSProperties['color'];
  $lineHeight?: CSSProperties['lineHeight'];
};

const Text: React.FC<TextProps> = (props) => {
  const { children, as, variant, fontWeight, fontSize, color, margin = 0, lineHeight = 1, ...rest } = props;
  const Tag = as || 'p';
  const theme = useAppTheme();

  function getFontWeight(): CSSProperties['fontWeight'] {
    if (variant && fontWeight) {
      throw Error("both variant and fontWeight shouldn't have value");
    }

    if (!variant && fontWeight) {
      return fontWeight;
    }

    switch (variant) {
      case 'heading':
      case 'subhead':
        return 'bold';
      case 'title':
      case 'body':
        return 500;
      case 'subtitle':
        return 400;
      default:
        return 500;
    }
  }

  function getFontSize(): string {
    /*    if (variant && fontSize) {
      throw Error("both variant and fontSize shouldn't have value");
    }*/

    if (!variant && fontSize) {
      return fontSize;
    }

    switch (variant) {
      case 'heading':
        return '1.8rem';
      case 'subhead':
        return '1.7rem';
      case 'title':
        return '1.6rem';
      case 'subtitle':
        return '1.2rem';
      case 'body':
      default:
        return '1.4rem';
    }
  }

  function getColor(): CSSProperties['color'] {
    if (color) {
      return color;
    }

    switch (variant) {
      case 'heading':
        return theme.base.textPrimary; //theme.base.textPrimaryDark
      case 'subhead':
        return theme.base.textSecondary;
      case 'title':
        return theme.base.textPrimary;
      case 'body':
        return theme.base.textSecondary;
      case 'subtitle':
        return theme.base.textSecondary;
      default:
        return theme.base.textPrimary;
    }
  }

  return (
    <S.TextWrapper
      as={Tag}
      $fontWeight={getFontWeight()}
      $fontSize={getFontSize()}
      $color={getColor()}
      $margin={margin}
      $lineHeight={lineHeight}
      {...rest}
    >
      {children}
    </S.TextWrapper>
  );
};
export default Text;
