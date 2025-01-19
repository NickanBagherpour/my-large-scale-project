import { useTheme } from 'styled-components';
import { Badge } from 'antd';

type Props = {
  item: { value: string | number | null | undefined | boolean; hasDifference: boolean };
};

export function HistoryCell(props: Props) {
  const { item: { value, hasDifference } = {} } = props;

  const theme = useTheme();

  if (hasDifference) {
    const badgeColor = theme.error._600;
    return (
      <>
        {hasDifference && <Badge color={badgeColor} />} {value}
      </>
    );
  }

  return value;
}
