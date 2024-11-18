import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface TransientBoxProps {
  $display?: CSSProperties['display'];
  $flexDirection?: CSSProperties['flexDirection'];
  $justifyContent?: CSSProperties['justifyContent'];
  $alignItems?: CSSProperties['alignItems'];
  $alignContent?: CSSProperties['alignContent'];
  $flexWrap?: CSSProperties['flexWrap'];
  $flexGrow?: CSSProperties['flexGrow'];
  $flexShrink?: CSSProperties['flexShrink'];
  $flexBasis?: CSSProperties['flexBasis'];
  $alignSelf?: CSSProperties['alignSelf'];
  $height?: CSSProperties['height'];
  $maxHeight?: CSSProperties['maxHeight'];
  $minHeight?: CSSProperties['minHeight'];
  $width?: CSSProperties['width'];
  $maxWidth?: CSSProperties['maxWidth'];
  $minWidth?: CSSProperties['minWidth'];
  $padding?: CSSProperties['padding'];
  $paddingTop?: CSSProperties['paddingTop'];
  $paddingRight?: CSSProperties['paddingRight'];
  $paddingBottom?: CSSProperties['paddingBottom'];
  $paddingLeft?: CSSProperties['paddingLeft'];
  $margin?: CSSProperties['margin'];
  $marginTop?: CSSProperties['marginTop'];
  $marginRight?: CSSProperties['marginRight'];
  $marginBottom?: CSSProperties['marginBottom'];
  $marginLeft?: CSSProperties['marginLeft'];
  $border?: CSSProperties['border'];
  $borderRadius?: CSSProperties['borderRadius'];
  $boxShadow?: CSSProperties['boxShadow'];
  $backgroundColor?: CSSProperties['backgroundColor'];
  $color?: CSSProperties['color'];
  $fontSize?: CSSProperties['fontSize'];
  $fontWeight?: CSSProperties['fontWeight'];
  $lineHeight?: CSSProperties['lineHeight'];
  $letterSpacing?: CSSProperties['letterSpacing'];
  $textAlign?: CSSProperties['textAlign'];
  $fill_children?: string;
}

const StyledBox = styled.div<TransientBoxProps>`
  display: ${(props) => props.$display ?? 'flex'};
  flex-direction: ${(props) => props.$flexDirection ?? 'row'};
  justify-content: ${(props) => props.$justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.$alignItems ?? 'stretch'};
  align-content: ${(props) => props.$alignContent ?? 'stretch'};
  flex-wrap: ${(props) => props.$flexWrap ?? 'nowrap'};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  flex-shrink: ${(props) => props.$flexShrink ?? 1};
  flex-basis: ${(props) => props.$flexBasis ?? 'auto'};
  align-self: ${(props) => props.$alignSelf ?? 'auto'};
  height: ${(props) => props.$height ?? 'auto'};
  max-height: ${(props) => props.$maxHeight ?? 'none'};
  min-height: ${(props) => props.$minHeight ?? 'auto'};
  width: ${(props) => props.$width ?? 'auto'};
  max-width: ${(props) => props.$maxWidth ?? 'none'};
  min-width: ${(props) => props.$minWidth ?? 'auto'};
  padding: ${(props) => props.$padding ?? 0};
  margin: ${(props) => props.$margin ?? 0};
  border: ${(props) => props.$border ?? 'none'};
  border-radius: ${(props) => props.$borderRadius ?? '0'};
  box-shadow: ${(props) => props.$boxShadow ?? 'none'};
  background-color: ${(props) => props.$backgroundColor ?? 'transparent'};
  color: ${(props) => props.$color ?? 'inherit'};
  font-size: ${(props) => props.$fontSize ?? 'inherit'};
  font-weight: ${(props) => props.$fontWeight ?? 'normal'};
  line-height: ${(props) => props.$lineHeight ?? 'normal'};
  letter-spacing: ${(props) => props.$letterSpacing ?? 'normal'};
  text-align: ${(props) => props.$textAlign ?? 'inherit'};

  ${(props) => props.$paddingTop && `padding-top: ${props.$paddingTop};`}
  ${(props) => props.$paddingRight && `padding-right: ${props.$paddingRight};`}
  ${(props) => props.$paddingBottom && `padding-bottom: ${props.$paddingBottom};`}
  ${(props) => props.$paddingLeft && `padding-left: ${props.$paddingLeft};`}
  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop};`}
  ${(props) => props.$marginRight && `margin-right: ${props.$marginRight};`}
  ${(props) => props.$marginBottom && `margin-bottom: ${props.$marginBottom};`}
  ${(props) => props.$marginLeft && `margin-left: ${props.$marginLeft};`}

  ${(props) =>
    props.$fill_children === 'true'
      ? css`
          & > * {
            width: 100%;
          }
        `
      : css`
          & > * {
            width: fit-content;
          }
        `}
`;

interface BoxProps {
  visible?: boolean;
  children?: React.ReactNode;
  fillChildren?: boolean;
  styleProps?: TransientBoxProps;
}

export const Box: React.FC<BoxProps> = ({ visible = true, children, fillChildren = true, styleProps }) => {
  return (
    visible && (
      <StyledBox {...styleProps} $fill_children={String(fillChildren)}>
        {children}
      </StyledBox>
    )
  );
};
