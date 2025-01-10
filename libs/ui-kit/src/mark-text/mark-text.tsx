import React, { Fragment } from 'react';

import * as S from './mark-text.style';

export type HighlightColorType = 'success' | 'warning' | 'error' | React.CSSProperties['color'];

export type PropsType = {
  text: string;
  wordToHighlight: string;
  highlightColor: HighlightColorType;
  className?: string;
};

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const MarkText = React.forwardRef<HTMLSpanElement, PropsType>(
  ({ text, wordToHighlight, highlightColor, ...rest }, ref) => {
    const escapedWord = escapeRegExp(wordToHighlight);
    const parts = text.split(new RegExp(`(${escapedWord})`, 'gi'));

    return (
      <span ref={ref} {...rest}>
        {parts.map((part, index) =>
          part.toLowerCase() === wordToHighlight.toLowerCase() ? (
            <S.StyledSpan $customStyle={highlightColor} key={index}>
              {part}
            </S.StyledSpan>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
      </span>
    );
  },
);

MarkText.displayName = 'MarkText';
