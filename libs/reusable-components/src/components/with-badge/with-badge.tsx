import React from 'react';
import { Tooltip } from 'antd';
import { getValueOrDash, REGEX_PATTERNS } from '@oxygen/utils';

import { StyledList } from './width-badge.style';
import * as S from './width-badge.style';

type Props = {
  items: string[];
  onRender?: (value: string) => React.ReactNode;
};

export default function WithBadge(props: Props) {
  const { items, onRender } = props;

  const count = items.length;
  const firstItem = items[0];

  const formattedFirstItem = getValueOrDash(firstItem && firstItem.replace(/[{}]/g, ''));

  const listItems = items
    // ?.slice(1)
    .map((item, index) => <li key={index}>{getValueOrDash(item && item.replace(/[{}]/g, ''))}</li>);

  function isPersian(text: string): boolean {
    return REGEX_PATTERNS.PersianIdentifier.test(text);
  }

  function isMorePersian(items: string[]): boolean {
    const persianCount = items.filter((item) => isPersian(item)).length;
    const englishCount = items.length - persianCount;
    return persianCount > englishCount;
  }

  const isPersianContent = isMorePersian(items);

  const renderFirstItem = () => {
    if (onRender) {
      return onRender(formattedFirstItem);
    }
    return <span>{formattedFirstItem}</span>;
  };

  return count > 1 ? (
    <Tooltip title={<StyledList $isPersian={isPersianContent}>{listItems}</StyledList>} arrow={false}>
      {renderFirstItem()}
      <S.Badge count={`+${count - 1}`} />
    </Tooltip>
  ) : (
    <Tooltip placement='top' title={getValueOrDash(listItems)} arrow={true}>
      {renderFirstItem()}
    </Tooltip>
  );
}
