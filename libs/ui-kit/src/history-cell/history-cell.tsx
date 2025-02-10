import { useTheme } from 'styled-components';
import { Badge } from 'antd';
import { HistoryCellContainer } from './history-cell.style';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  item: { value: string | number | null | undefined | boolean; hasDifference: boolean };
};

export function HistoryCell(props: Props) {
  const { item: { value = getValueOrDash(''), hasDifference } = {} } = props;

  const theme = useTheme();

  if (hasDifference) {
    const badgeColor = theme.error._600;
    return (
      <HistoryCellContainer>
        <span className='badge-wrapper'>
          <Badge color={badgeColor} />
        </span>
        <span className='text'>{getValueOrDash(value)}</span>
      </HistoryCellContainer>
    );
  }

  return value;
}
