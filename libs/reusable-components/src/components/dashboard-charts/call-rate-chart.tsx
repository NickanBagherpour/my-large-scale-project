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
  const failColor = theme.error._500;
  const successColor = theme.dashboard.cyan;
  const [activeChart, setActiveChart] = useState<ActiveChartType>('bar');
  const handleChangeActiveChart = (val: ActiveChartType) => setActiveChart(val);
  const list = data?.data;
  const chartsProps = {
    successColor,
    isLoading,
    failColor,
    data: list,
  };
  return (
    <Container style={{ minHeight: '400px' }} fillContainer={true}>
      <ChartHeader
        refetchData={refetchData}
        onChangeTimeSelection={onChangeTimeSelection}
        timeSelection={timeSelection}
      />
      {list?.length > 0 || isLoading ? (
        <>
          {activeChart === 'bar' ? <BarCallRateChart {...chartsProps} /> : <AreaCallRateChart {...chartsProps} />}
          <CustomLegend
            isLoading={isLoading}
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
