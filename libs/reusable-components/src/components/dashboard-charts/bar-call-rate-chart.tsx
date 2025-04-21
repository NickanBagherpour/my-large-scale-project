import { useTr } from '@oxygen/translation';
import { BarChart } from '@oxygen/ui-kit';

type Props = {
  data: any;
  isLoading: boolean;
  failColor: string;
  successColor: string;
};
const BarCallRateChart: React.FC<Props> = ({ data, isLoading, failColor, successColor }) => {
  const [t] = useTr();
  return (
    <BarChart
      data={data}
      xAxisProps={{ dataKey: 'time', padding: { right: 0, left: 0 } }}
      barProps={[
        { dataKey: 'failureCount', fill: failColor, name: t('common.count'), stackId: 'a' },
        { dataKey: 'successCount', fill: successColor, name: t('common.count'), stackId: 'a' },
      ]}
      legendProps={{ content: () => <></> }}
      isLoading={isLoading}
    />
  );
};
export default BarCallRateChart;
