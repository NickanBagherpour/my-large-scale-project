import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { AreaChart } from '@oxygen/ui-kit';
import { ReferenceDot } from 'recharts';

type Props = {
  data: any;
  isLoading: boolean;
  failColor: string;
  successColor: string;
};
const AreaCallRateChart: React.FC<Props> = ({ data, isLoading, failColor, successColor }) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const maxSuccessValue = getMaxElement(data, 'count');
  const maxFailValue = getMaxElement(data, 'count2');
  return (
    <AreaChart
      xAxisProps={{ dataKey: 'time', padding: { right: 0, left: 0 } }}
      areaProps={[
        {
          dataKey: 'count2',
          stroke: failColor,
          name: t('common.count'),
          fill: 'url(#colorFail)',
        },
        {
          dataKey: 'count',
          stroke: successColor,
          name: t('common.count'),
          fill: 'url(#colorSuccess)',
        },
      ]}
      isLoading={isLoading}
      data={data}
    >
      <defs>
        <linearGradient id='colorSuccess' x1='0%' y1='0%' x2='0' y2='100%'>
          <stop offset='29.49%' stopColor={theme.info._600} stopOpacity={0.2} />
          <stop offset='102.61%' stopColor={theme.info._100} stopOpacity={0} />
        </linearGradient>
        <linearGradient id='colorFail' x1='0%' y1='0' x2='0' y2='100%'>
          <stop offset='29.49%' stopColor={theme.error._500} stopOpacity={0.2} />
          <stop offset='102.61%' stopColor={theme.error._100} stopOpacity={0} />
        </linearGradient>
      </defs>
      <ReferenceDot x={maxSuccessValue?.time} y={maxSuccessValue.count} strokeWidth={0} fill={successColor} r={6} />
      <ReferenceDot x={maxFailValue?.time} y={maxFailValue.count2} strokeWidth={0} fill={failColor} r={6} />
    </AreaChart>
  );
};
export default AreaCallRateChart;

const getMaxElement = (arr: any[], valueProperty: string) => {
  const filteredArr = arr.map((item) => item[valueProperty]);
  return arr.filter((d) => d[valueProperty] === Math.max(...filteredArr))?.[0];
};
