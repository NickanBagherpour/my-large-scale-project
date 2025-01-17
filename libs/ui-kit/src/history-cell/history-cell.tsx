import { useTheme } from 'styled-components';
import { Badge } from 'antd';

type Props = {
  item: { value: string | number | null | undefined | boolean; isDifferent: boolean };
};

export function HistoryCell(props: Props) {
  const { item: { value, isDifferent } = {} } = props;

  const theme = useTheme();

  if (isDifferent) {
    const badgeColor = theme.error._600;
    return (
      <>
        {isDifferent && <Badge color={badgeColor} />} {value}
      </>
    );
  }

  return value;
}
