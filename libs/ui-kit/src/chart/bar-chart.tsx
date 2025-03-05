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
import animation from '../assets/media/Chart Loader.json';

import * as S from './bar-chart.style';
import { LazyLottie } from '@oxygen/reusable-components';

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
  ...rest
}) => {
  const { ref: _, ...filteredLegendProps } = legendProps || {};
  const theme = useAppTheme();
  const [t] = useTr();
  return (
    <>
      <S.Container>
        {' '}
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
              <CartesianGrid {...cartesianProps} strokeDasharray='3 3' />
              <XAxis {...xAxisProps} includeHidden fontSize={'1.2rem'} />
              <YAxis {...yAxisProps} fontSize='1.2rem' />
              <Tooltip
                {...tooltipProps}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid transparent',
                  backgroundColor: theme.secondary._50,
                  boxShadow: '0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026',
                }}
              />
              <Legend {...filteredLegendProps} />
              {barProps?.map(({ ref, ...b }, index) => (
                <Bar key={b.dataKey ? b.dataKey.toString() : `bar-${index}`} {...b} />
              ))}
            </RechartBar>
          </ResponsiveContainer>
        )}
      </S.Container>
    </>
  );
};
