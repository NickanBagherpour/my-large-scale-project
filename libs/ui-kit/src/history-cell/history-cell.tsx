import { useTheme } from 'styled-components';
import { Badge } from 'antd';

type Props = {
  item: { originalValue: string | number | null | undefined | boolean; hasDifference: boolean };
};

export function HistoryCell(props: Props) {
  const { item: { originalValue, hasDifference } = {} } = props;

  const theme = useTheme();

  if (hasDifference) {
    const badgeColor = theme.error._600;
    return (
      <>
        {hasDifference && <Badge color={badgeColor} />} {originalValue}
      </>
    );
  }

  return originalValue;
}
