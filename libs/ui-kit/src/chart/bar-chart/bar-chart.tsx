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

import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { LazyLottie } from '@oxygen/reusable-components';
import animation from '../../assets/media/Chart Loader.json';
import CustomTooltip from '../custom-tooltip';

import * as S from './bar-chart.style';

type Props = {
  isLoading: boolean;
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
  isLoading,
  children,
  ...rest
}) => {
  const { ref: _, ...filteredLegendProps } = legendProps || {};
  const theme = useAppTheme();
  const [t] = useTr();

  return (
    <S.Container>
      {isLoading ? (
        <S.Loading>
          <LazyLottie width={100} height={100} animationData={animation} loop />
          {/* <Lottie style={{ width: 100, height: 100 }} animationData={animation} loop /> */}
          <S.LoadingTxt>{t('uikit.please_wait')}</S.LoadingTxt>
        </S.Loading>
      ) : (
        <ResponsiveContainer {...containerProps} width='100%' height='100%'>
          <RechartBar
            {...rest}
            margin={{
              top: 5,
              right: 10,
              bottom: 5,
              left: 10,
            }}
          >
            <CartesianGrid stroke={theme.border._100} vertical={false} {...cartesianProps} />
            <XAxis {...xAxisProps} axisLine={false} includeHidden fontSize={'1.2rem'} tickLine={false} />
            <YAxis {...yAxisProps} type='number' axisLine={false} fontSize='1.2rem' tickLine={false} tickCount={10} />
            <Tooltip
              content={<CustomTooltip />}
              {...tooltipProps}
              // contentStyle={{
              //   borderRadius: '12px',
              //   border: '1px solid transparent',
              //   backgroundColor: theme.secondary._50,
              //   boxShadow: '0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026',
              //   direction:'rtl',
              // }}
            />
            <Legend {...filteredLegendProps} />
            {barProps?.map(({ ref, ...b }, index) => (
              <Bar key={b.dataKey ? b.dataKey.toString() : `bar-${index}`} {...b} radius={[2, 2, 0, 0]} />
            ))}
            {children}
          </RechartBar>
        </ResponsiveContainer>
      )}
    </S.Container>
  );
};
