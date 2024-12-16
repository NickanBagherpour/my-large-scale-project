import React from 'react';

import * as S from './tag.style';
import { TagProps } from 'antd';

export type TagType = TagProps & {
  text: string;
};

export const Tag: React.FC<TagType> = (props) => {
  const { text } = props;
  return (
    <S.Tag>
      <span>{text}</span>
    </S.Tag>
  );
};
