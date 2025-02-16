import { useTheme } from 'styled-components';
import { Badge } from 'antd';
import { HistoryCellContainer } from './history-cell.style';
import { getValueOrDash, REGEX_PATTERNS } from '@oxygen/utils';

type Props = {
  item: { value: string | number | null | undefined | boolean; hasDifference: boolean };
};

export function HistoryCell(props: Props) {
  const { item: { value, hasDifference } = {} } = props;

  const theme = useTheme();

  const valueIsString = typeof value === 'string';

  function isPersian(text: string) {
    return REGEX_PATTERNS.PersianIdentifier.test(text);
  }

  if (hasDifference) {
    const badgeColor = theme.error._600;
    return (
      <HistoryCellContainer $isPersian={valueIsString ? isPersian(value) : false}>
        <span className='badge-wrapper'>
          <Badge color={badgeColor} />
        </span>
        <span className='text'>{getValueOrDash(value)}</span>
      </HistoryCellContainer>
    );
  }

  return getValueOrDash(value);
}
