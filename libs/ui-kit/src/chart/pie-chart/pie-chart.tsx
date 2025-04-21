import {
  Cell,
  CellProps,
  Pie,
  PieChart as RechartPie,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import React, { ReactElement, useState } from 'react';
import CustomTooltip from '../custom-tooltip';
import * as S from './pie-chart.style';
type ComponentProps = {
  isLoading?: boolean;
  LoadingComponent?: ReactElement;
  containerProps?: ResponsiveContainerProps;
  tooltipProps?: TooltipProps<string, number>;
  cellProps?: CellProps[];
  pieProps?: any;
} & CategoricalChartProps;

export const PieChart: React.FC<ComponentProps> = ({
  containerProps,
  isLoading,
  LoadingComponent,
  pieProps,
  cellProps,
  data,
  tooltipProps,
  children,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const handleMouseEnter = (index: any) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  return (
    <>
      <S.Container>
        {isLoading ? (
          <S.Loading>{LoadingComponent}</S.Loading>
        ) : (
          <ResponsiveContainer {...containerProps} width='100%' height={200}>
            <RechartPie {...rest}>
              <Pie
                fillOpacity={activeIndex ? 0.5 : 1}
                {...pieProps}
                activeShape={{
                  fillOpacity: 1,
                  strokeWidth: 1,
                  stroke: data?.[activeIndex || 0]?.fill.slice(0, -4) + '_700',
                }}
                onMouseEnter={(props: any) => handleMouseEnter(props)}
                onMouseLeave={handleMouseLeave}
              >
                {cellProps?.map((itemProps, index) => (
                  <Cell key={`cell-${index}`} {...itemProps} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} {...tooltipProps} />
              {children}
            </RechartPie>
          </ResponsiveContainer>
        )}
      </S.Container>
    </>
  );
};
