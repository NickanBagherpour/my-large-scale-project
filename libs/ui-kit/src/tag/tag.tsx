import React, { ReactNode } from 'react';

import { TagProps } from 'antd';

import * as S from './tag.style';

export type TypeValueType = 'default' | 'initialApproval' | 'finalApproval' | 'processing' | 'error' | 'warning';
export type TagType = TagProps & {
  children: string | ReactNode;
  type?: TypeValueType;
};

export const Tag = (props: TagType) => {
  const { children, type, ...rest } = props;
  return (
    <S.Tag type={type} {...rest}>
      <S.TagText>{children}</S.TagText>
    </S.Tag>
  );
};
