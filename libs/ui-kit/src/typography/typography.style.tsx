import styled from 'styled-components';
import { Typography } from 'antd';
import { TextProps as AntTextProps } from 'antd/es/typography/Text';
import { LinkProps as AntLinkProps } from 'antd/es/typography/Link';
import { TitleProps as AntTitleProps } from 'antd/es/typography/Title';
import { ParagraphProps as AntParagraphProps } from 'antd/es/typography/Paragraph';

const { Text: AntText, Link: AntLink, Title: AntTitle, Paragraph: AntParagraph } = Typography;

export const Text = styled(AntText)<AntTextProps>`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`;

export const Link = styled(AntLink)<AntLinkProps>`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem;
`;

export const Title = styled(AntTitle)<AntTitleProps>`
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.8rem;
`;

export const Paragraph = styled(AntParagraph)<AntParagraphProps>`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem;
`;
