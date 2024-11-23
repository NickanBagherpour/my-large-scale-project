import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface TransientBoxProps {
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
  $fill_children?: string;
}

const StyledBox = styled.div<TransientBoxProps>`
  ${(props) => props.display && `display: ${props.display ?? 'initial'}`};
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection ?? 'initial'}`};
  ${(props) => props.justifyContent && `justify-content: ${props.justifyContent ?? 'initial'}`};
  ${(props) => props.alignItems && `align-Items: ${props.alignItems ?? 'initial'}`};
  ${(props) => props.alignContent && `align-content: ${props.alignContent ?? 'initial'}`};
  ${(props) => props.flexGrow && `flex-grow: ${props.flexGrow ?? 0}`};
  ${(props) => props.flexWrap && `flex-wrap: ${props.flexWrap ?? 'nowrap'}`};
  ${(props) => props.flexShrink && `flex-shrink: ${props.flexShrink ?? 1}`};
  ${(props) => props.flexBasis && `flex-basis: ${props.flexBasis ?? 'auto'}`};
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf ?? 'auto'}`};
  ${(props) => props.height && `height: ${props.height ?? 'auto'}`};
  ${(props) => props.maxHeight && `max-height: ${props.maxHeight ?? 'none'}`};
  ${(props) => props.minHeight && `min-height: ${props.minHeight ?? 'auto'}`};
  ${(props) => props.width && `width: ${props.width ?? 'auto'}`};
  ${(props) => props.maxWidth && `max-width: ${props.maxWidth ?? 'none'}`};
  ${(props) => props.minWidth && `min-width: ${props.minWidth ?? 'auto'}`};
  ${(props) => props.padding && `padding: ${props.padding ?? 0}`};
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop ?? 0}`};
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight ?? 0}`};
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom ?? 0}`};
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft ?? 0}`};
  ${(props) => props.margin && `margin: ${props.margin ?? 0}`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop ?? 0}`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight ?? 0}`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom ?? 0}`};
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft ?? 0}`};
  ${(props) => props.border && `border: ${props.border ?? 'none'}`};
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius ?? '0'}`};
  ${(props) => props.boxShadow && `box-shadow: ${props.boxShadow ?? 'none'}`};
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor ?? 'transparent'}`};
  ${(props) => props.color && `color: ${props.color ?? 'inherit'}`};
  ${(props) => props.fontSize && `font-size: ${props.fontSize ?? 'inherit'}`};
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight ?? 'normal'}`};
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight ?? 'normal'}`};
  ${(props) => props.letterSpacing && `letter-spacing: ${props.letterSpacing ?? 'normal'}`};
  ${(props) => props.textAlign && `text-align: ${props.textAlign ?? 'inherit'}`};
  ${(props) =>
    props.$fill_children === 'true'
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

export interface BoxProps extends TransientBoxProps {
  visible?: boolean;
  children?: React.ReactNode;
  fillChildren?: boolean;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ visible = true, children, fillChildren = true, className, ...rest }) => {
  return (
    visible && (
      <StyledBox className={className} $fill_children={String(fillChildren)} {...rest}>
        {children}
      </StyledBox>
    )
  );
};
