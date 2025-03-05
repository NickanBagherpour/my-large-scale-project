import { Flex, Radio } from 'antd';

import { BasicComponentProps } from '@oxygen/types';
import { BarChart, Button, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './call-rate-chart.style';

type Props = {
  timeSelection: number;
  onChangeTimeSelection: (value: number) => void;
  data: any;
  isLoading: boolean;
  refetchData: () => void;
} & BasicComponentProps;
const CallRateChart: React.FC<Props> = ({ timeSelection, onChangeTimeSelection, data, refetchData, isLoading }) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const chartData = data?.data ?? [];
  const options = [
    {
      label: t('uikit.minutes_ago', { time: 15 }),
      value: 1,
    },
    {
      label: t('uikit.minutes_ago', { time: 30 }),
      value: 2,
    },
    {
      label: t('uikit.hours_ago', { time: 1 }),
      value: 3,
    },
    {
      label: t('uikit.hours_ago', { time: 24 }),
      value: 4,
    },
    {
      label: t('uikit.days_ago', { time: 7 }),
      value: 5,
    },
    {
      label: t('uikit.days_ago', { time: 30 }),
      value: 6,
    },
  ];

  const renderLegend = () => {
    if (data) {
      return (
        <S.LegendContainer>
          <S.Date>
            <span>{data?.fromDate}</span>
            <span>{t('common.to')}</span>
            <span>{data?.toDate}</span>
          </S.Date>
          <S.CallRate>
            <span style={{ fontSize: '2rem' }}>
              <i className='icon-tick-circle-outlined' />
            </span>
            <S.TotalCount>{data?.totalCount}</S.TotalCount>
            <S.Subtitle>{t('uikit.success_call', { element: t('element.service') })}</S.Subtitle>
          </S.CallRate>
        </S.LegendContainer>
      );
    } else {
      return null;
    }
  };
  const { Option } = Select;
  const selectIcon = (
    <S.SelectIcons>
      <i className='icon-chev-down' />
      {<i className='icon-calendar-2' />}
    </S.SelectIcons>
  );
  return (
    <>
      <S.Header>
        <S.Title>{t('uikit.call_rate', { element: t('element.service') })}</S.Title>
        <S.Controls>
          <S.Select
            suffixIcon={selectIcon}
            value={timeSelection}
            onChange={onChangeTimeSelection}
            optionLabelProp='label'
            popupMatchSelectWidth={true}
          >
            {options.map((item) => (
              <Option key={item.value} value={item.value} label={item.label}>
                <Radio checked={item.value === timeSelection}>
                  <S.Label>{item.label}</S.Label>
                </Radio>
              </Option>
            ))}
          </S.Select>
          <Button
            iconPosition='end'
            icon={<i className='icon-reload' />}
            variant='filled'
            onClick={() => refetchData()}
          >
            {t('button.update')}
          </Button>
        </S.Controls>
      </S.Header>
      <BarChart
        data={chartData}
        xAxisProps={{ dataKey: 'time', padding: { right: 0, left: 0 } }}
        barProps={[{ dataKey: 'count', fill: theme.secondary.main, name: t('common.count') }]}
        cartesianProps={{ vertical: false }}
        legendProps={{ content: renderLegend }}
        isLoading={isLoading}
      />
    </>
  );
};
export default CallRateChart;
