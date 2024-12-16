import React from 'react';

import { TagProps } from 'antd';

import * as S from './tag.style';

export type TypeValueType = 'default' | 'success' | 'processing' | 'error' | 'warning';
export type TagType = TagProps & {
  text: string;
  type?: TypeValueType;
};

export const Tag = (props: TagType) => {
  const { text, type, ...rest } = props;
  return (
    <S.Tag type={type} {...rest}>
      <S.TagText>{text}</S.TagText>
    </S.Tag>
  );
};
