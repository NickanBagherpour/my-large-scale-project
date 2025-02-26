import { Radio, RadioChangeEvent, Space } from 'antd';

import { BasicComponentProps } from '@oxygen/types';
import { BarChart, Button, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './call-rate-chart.style';

type Props = {
  timeSelection: number;
  onChangeTimeSelection: (value: number) => void;
  data: any;
  refetchData: () => void;
} & BasicComponentProps;
const CallRateChart: React.FC<Props> = ({ timeSelection, onChangeTimeSelection, data, refetchData }) => {
  const [t] = useTr();

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

  const handleSelect = (e: RadioChangeEvent) => {
    onChangeTimeSelection(e.target.value);
  };
  return (
    <>
      <S.Header>
        <S.Title>{t('uikit.call_rate', { element: t('element.service') })}</S.Title>
        <S.Controls>
          <Select
            dropdownRender={(menu) => (
              <div style={{ padding: '8px' }}>
                <Radio.Group onChange={(e) => handleSelect(e)} value={timeSelection}>
                  <Space direction='vertical'>
                    {options.map(({ value, label }) => (
                      <Radio value={value}>{label}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            )}
            options={options}
            value={timeSelection}
            style={{ width: '20rem' }}
          ></Select>
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
      <BarChart data={data} />
      <S.Footer>
        <S.Date></S.Date>
        <S.Text></S.Text>
      </S.Footer>
    </>
  );
};
export default CallRateChart;
