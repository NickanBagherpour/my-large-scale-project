import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartBar,
  ResponsiveContainerProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  LegendProps,
  BarProps,
} from 'recharts';

import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import * as S from './bar-chart.style';
type Props = {
  containerProps?: ResponsiveContainerProps;
  cartesianProps?: CartesianGridProps;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  tooltipProps?: TooltipProps<string, number>;
  legendProps?: LegendProps;
  barProps?: BarProps[];
} & CategoricalChartProps;
export const BarChart: React.FC<Props> = ({
  barProps,
  legendProps,
  tooltipProps,
  yAxisProps,
  xAxisProps,
  cartesianProps,
  containerProps,
  ...rest
}) => {
  const { ref: _, ...filteredLegendProps } = legendProps || {};
  return (
    <>
      <ResponsiveContainer {...containerProps} width='100%' height='100%'>
        <RechartBar
          {...rest}
          width={500}
          height={300}
          //   data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid {...cartesianProps} strokeDasharray='3 3' />
          <XAxis {...xAxisProps} dataKey='name' />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...filteredLegendProps} />
          {barProps?.map(({ ref, ...b }, index) => (
            <Bar key={b.dataKey ? b.dataKey.toString() : `bar-${index}`} {...b} />
          ))}
        </RechartBar>
      </ResponsiveContainer>
    </>
  );
};
