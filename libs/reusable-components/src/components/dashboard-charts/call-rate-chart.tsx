import { useState } from 'react';
import { BasicComponentProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';
import NoResult from '../no-result/no-result';
import CustomLegend from './custom-legend';
import ChartHeader from './chart-header';
import BarCallRateChart from './bar-call-rate-chart';
import AreaCallRateChart from './area-call-rate-chart';

type Props = {
  timeSelection: number;
  onChangeTimeSelection: (value: number) => void;
  data: any;
  isLoading: boolean;
  refetchData: () => void;
} & BasicComponentProps;
export type ActiveChartType = 'bar' | 'line';
const CallRateChart: React.FC<Props> = ({ timeSelection, onChangeTimeSelection, data, refetchData, isLoading }) => {
  const theme = useAppTheme();
  const chartData =
    data?.data?.map((d) => {
      return { ...d, count2: d.count + 200 }; //NEEDS TO BE DELETED ALSO CHANGE LABLES
    }) ?? [];
  const failColor = theme.error._500;
  const successColor = theme.dashboard.cyan;
  const [activeChart, setActiveChart] = useState<ActiveChartType>('bar');
  const handleChangeActiveChart = (val: ActiveChartType) => setActiveChart(val);

  const chartsProps = {
    successColor,
    isLoading,
    failColor,
    data: chartData,
  };
  return (
    <Container fillContainer={true}>
      <ChartHeader
        refetchData={refetchData}
        onChangeTimeSelection={onChangeTimeSelection}
        timeSelection={timeSelection}
      />
      {chartData.length > 0 ? (
        <>
          {activeChart === 'bar' ? <BarCallRateChart {...chartsProps} /> : <AreaCallRateChart {...chartsProps} />}
          <CustomLegend
            activeChart={activeChart}
            onActiveChartChange={handleChangeActiveChart}
            data={data}
            successColor={successColor}
            failColor={failColor}
          />
        </>
      ) : (
        <NoResult isLoading={isLoading} />
      )}
    </Container>
  );
};
export default CallRateChart;
