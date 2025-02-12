import { Tooltip } from 'antd';
import { StyledList } from './badge.style';
import { getValueOrDash, REGEX_PATTERNS } from '@oxygen/utils';

import * as S from './badge.style';

type Props = {
  items: string[];
};

export default function WidthBadge(props: Props) {
  const { items } = props;
  const count = items.length;
  const firstItem = items[0];

  const formattedFirstItem = getValueOrDash(firstItem && firstItem.replace(/[{}]/g, ''));

  const listItems = items
    ?.slice(1)
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

  return (
    <>
      {count > 1 ? (
        <Tooltip title={<StyledList isPersian={isPersianContent}>{listItems}</StyledList>} arrow={false}>
          <span>{formattedFirstItem}</span>
          {<S.Badge count={`+${count - 1}`} />}
        </Tooltip>
      ) : (
        <span>{formattedFirstItem}</span>
      )}
    </>
  );
}
