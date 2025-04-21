import { Radio } from 'antd';
import { Button, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './chart-header.style';
type Props = {
  refetchData: () => void;
  timeSelection: number;
  onChangeTimeSelection: (value: number) => void;
};
const ChartHeader: React.FC<Props> = ({ timeSelection, onChangeTimeSelection, refetchData }) => {
  const [t] = useTr();
  const { Option } = Select;
  const selectIcon = (
    <S.SelectIcons>
      <S.Icon className='icon-chev-down' />
      {<S.Icon className='icon-calendar-2' />}
    </S.SelectIcons>
  );

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
      label: 7 + t('common.days_ago'),
      value: 5,
    },
    {
      label: 30 + t('common.days_ago'),
      value: 6,
    },
  ];

  return (
    <S.Header>
      <S.Title>{t('uikit.call_rate_report', { element: t('element.service') + t('common.s') })}</S.Title>
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
        <Button iconPosition='end' icon={<S.Icon className='icon-reload' />} variant='filled' onClick={refetchData}>
          <S.ButtonText>{t('button.update')}</S.ButtonText>
        </Button>
      </S.Controls>
    </S.Header>
  );
};
export default ChartHeader;
