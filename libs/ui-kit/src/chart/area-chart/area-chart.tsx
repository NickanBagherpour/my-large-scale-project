import { LazyLottie } from '@oxygen/reusable-components';
import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart as RechartAreaChart,
  YAxis,
  XAxis,
  Tooltip,
  Line,
  ReferenceLine,
  ResponsiveContainerProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  LegendProps,
  LineProps,
  Area,
  AreaProps,
  LineChart,
  ReferenceDot,
} from 'recharts';
import animation from '../../assets/media/Chart Loader.json';
import { useTr } from '@oxygen/translation';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { useAppTheme } from '@oxygen/hooks';
import CustomTooltip from '../custom-tooltip';
import * as S from './area-chart.style';
type Props = {
  data: any;
  isLoading: boolean;
  containerProps?: ResponsiveContainerProps;
  cartesianProps?: CartesianGridProps;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  tooltipProps?: TooltipProps<string, number>;
  legendProps?: LegendProps;
  areaProps?: AreaProps[];
} & CategoricalChartProps;
export const AreaChart: React.FC<Props> = ({
  data,
  isLoading,
  containerProps,
  cartesianProps,
  areaProps,
  legendProps,
  tooltipProps,
  yAxisProps,
  xAxisProps,
  children,
  ...rest
}) => {
  const [t] = useTr();
  const theme = useAppTheme();
  return (
    <S.Container>
      {isLoading ? (
        <S.Loading>
          <LazyLottie width={100} height={100} animationData={animation} loop />
          {/* <Lottie style={{ width: 100, height: 100 }} animationData={animation} loop /> */}
          <S.LoadingTxt>{t('uikit.please_wait')}</S.LoadingTxt>
        </S.Loading>
      ) : (
        <ResponsiveContainer width='100%' height='100%' {...containerProps}>
          <RechartAreaChart
            margin={{
              top: 5,
              right: 10,
              bottom: 5,
              left: 10,
            }}
            data={data}
            {...rest}
          >
            {children}
            <XAxis axisLine={false} tickLine={false} {...xAxisProps} />
            <YAxis tickCount={10} axisLine={false} tickLine={false} {...yAxisProps} />
            <CartesianGrid stroke={theme.border._100} vertical={false} {...cartesianProps} />
            <Tooltip
              cursor={{ stroke: theme.border._600, strokeDasharray: '3 3' }}
              content={<CustomTooltip />}
              {...tooltipProps}
            />
            {areaProps?.map(({ ref, ...a }, index) => (
              <Area
                type='monotone'
                strokeWidth={3}
                activeDot={false}
                key={a.dataKey ? a.dataKey.toString() : `area-${index}`}
                {...a}
              />
            ))}
          </RechartAreaChart>
        </ResponsiveContainer>
      )}
    </S.Container>
  );
};
