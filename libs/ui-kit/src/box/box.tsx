import type React from 'react';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export interface BoxProps {
  visible?: boolean;
  children?: React.ReactNode;
  fillChildren?: boolean;
  className?: string;
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];
  alignSelf?: CSSProperties['alignSelf'];
  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  minHeight?: CSSProperties['minHeight'];
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: CSSProperties['minWidth'];
  padding?: CSSProperties['padding'];
  paddingTop?: CSSProperties['paddingTop'];
  paddingRight?: CSSProperties['paddingRight'];
  paddingBottom?: CSSProperties['paddingBottom'];
  paddingLeft?: CSSProperties['paddingLeft'];
  margin?: CSSProperties['margin'];
  marginTop?: CSSProperties['marginTop'];
  marginRight?: CSSProperties['marginRight'];
  marginBottom?: CSSProperties['marginBottom'];
  marginLeft?: CSSProperties['marginLeft'];
  border?: CSSProperties['border'];
  borderRadius?: CSSProperties['borderRadius'];
  boxShadow?: CSSProperties['boxShadow'];
  backgroundColor?: CSSProperties['backgroundColor'];
  color?: CSSProperties['color'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  letterSpacing?: CSSProperties['letterSpacing'];
  textAlign?: CSSProperties['textAlign'];
}

type TransientBoxProps = {
  [K in keyof Omit<BoxProps, 'visible' | 'children' | 'fillChildren' | 'className'> as `$${string & K}`]: BoxProps[K];
} & {
  $fillChildren?: string;
};

const StyledBox = styled.div<TransientBoxProps>`
  ${(props) => props.$display && `display: ${props.$display}`};
  ${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection}`};
  ${(props) => props.$justifyContent && `justify-content: ${props.$justifyContent}`};
  ${(props) => props.$alignItems && `align-items: ${props.$alignItems}`};
  ${(props) => props.$alignContent && `align-content: ${props.$alignContent}`};
  ${(props) => props.$flexWrap && `flex-wrap: ${props.$flexWrap}`};
  ${(props) => props.$flexGrow && `flex-grow: ${props.$flexGrow}`};
  ${(props) => props.$flexShrink && `flex-shrink: ${props.$flexShrink}`};
  ${(props) => props.$flexBasis && `flex-basis: ${props.$flexBasis}`};
  ${(props) => props.$alignSelf && `align-self: ${props.$alignSelf}`};
  ${(props) => props.$height && `height: ${props.$height}`};
  ${(props) => props.$maxHeight && `max-height: ${props.$maxHeight}`};
  ${(props) => props.$minHeight && `min-height: ${props.$minHeight}`};
  ${(props) => props.$width && `width: ${props.$width}`};
  ${(props) => props.$maxWidth && `max-width: ${props.$maxWidth}`};
  ${(props) => props.$minWidth && `min-width: ${props.$minWidth}`};
  ${(props) => props.$padding && `padding: ${props.$padding}`};
  ${(props) => props.$paddingTop && `padding-top: ${props.$paddingTop}`};
  ${(props) => props.$paddingRight && `padding-right: ${props.$paddingRight}`};
  ${(props) => props.$paddingBottom && `padding-bottom: ${props.$paddingBottom}`};
  ${(props) => props.$paddingLeft && `padding-left: ${props.$paddingLeft}`};
  ${(props) => props.$margin && `margin: ${props.$margin}`};
  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}`};
  ${(props) => props.$marginRight && `margin-right: ${props.$marginRight}`};
  ${(props) => props.$marginBottom && `margin-bottom: ${props.$marginBottom}`};
  ${(props) => props.$marginLeft && `margin-left: ${props.$marginLeft}`};
  ${(props) => props.$border && `border: ${props.$border}`};
  ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius}`};
  ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow}`};
  ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor}`};
  ${(props) => props.$color && `color: ${props.$color}`};
  ${(props) => props.$fontSize && `font-size: ${props.$fontSize}`};
  ${(props) => props.$fontWeight && `font-weight: ${props.$fontWeight}`};
  ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight}`};
  ${(props) => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing}`};
  ${(props) => props.$textAlign && `text-align: ${props.$textAlign}`};
  ${(props) =>
    props.$fillChildren === 'true'
      ? `
          & > * {
            width: 100%;
          }
        `
      : `
          & > * {
            width: fit-content;
          }
        `}
`;

export const Box: React.FC<BoxProps> = ({ visible = true, children, fillChildren = true, className, ...rest }) => {
  if (!visible) return null;

  const transientProps = Object.entries(rest).reduce((acc, [key, value]) => {
    acc[`$${key}`] = value;
    return acc;
  }, {} as TransientBoxProps);

  return (
    <StyledBox className={className} $fillChildren={String(fillChildren)} {...transientProps}>
      {children}
    </StyledBox>
  );
};
