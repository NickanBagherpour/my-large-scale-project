import styled from 'styled-components';

import { Typography as AntTypography, TypographyProps as AntTypographyProps } from 'antd';
import { TextProps as AntTextProps } from 'antd/lib/typography/Text';
import { LinkProps as AntLinkProps } from 'antd/lib/typography/Link';
import { TitleProps as AntTitleProps } from 'antd/lib/typography/Title';
import { ParagraphProps as AntParagraphProps } from 'antd/lib/typography/Paragraph';

const { Text: AntText, Link: AntLink, Title: AntTitle, Paragraph: AntParagraph } = AntTypography;

export const Typography = styled(AntTypography)<AntTypographyProps>``;

export const Text = styled(AntText)<AntTextProps>``;

export const Link = styled(AntLink)<AntLinkProps>``;

export const Title = styled(AntTitle)<AntTitleProps>``;

export const Paragraph = styled(AntParagraph)<AntParagraphProps>``;
