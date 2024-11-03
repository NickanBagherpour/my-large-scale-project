import React from 'react';

import * as S from './mark-text.style';

export type HighlightColorType = 'success' | 'warning' | 'error' | React.CSSProperties['color'];

type PropsType = {
  text: string;
  wordToHighlight: string;
  highlightColor: HighlightColorType;
  className?: string;
  // fontSize?: string;
  // fontWeight?: string;
  // [key: string]: any;
};

export const MarkText = ({ text, wordToHighlight, highlightColor, ...rest }: PropsType) => {
  const parts = text.split(new RegExp(`(${wordToHighlight})`, 'gi'));
  return (
    <span {...rest}>
      {parts.map((part, index) =>
        part === wordToHighlight ? (
          <S.StyledSpan customStyle={highlightColor} key={index}>
            {part}
          </S.StyledSpan>
        ) : (
          part
        )
      )}
    </span>
  );
};
