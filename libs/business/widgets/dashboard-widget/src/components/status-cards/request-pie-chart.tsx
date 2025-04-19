import { FC } from 'react';
import { Customized } from 'recharts';
import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { PieChart } from '@oxygen/ui-kit';

const RequestPieChart: React.FC = () => {
  const theme = useAppTheme();
  const [t] = useTr();
  const fakeTotal = 125;
  const fakeData = [
    {
      name: t('final_confirmation'),
      value: 30,
      fill: theme.secondary._400,
    },
    {
      name: t('rejected'),
      value: 10,
      fill: theme.error._500,
    },
    {
      name: t('waiting_to_confirm'),
      value: 60,
      fill: theme.primary._500,
    },
  ];
  const RenderCenterText: FC<any> = ({ cx, cy }) => {
    console.log('cy', typeof cy, cy);

    return (
      <>
        <text
          x={cx}
          y={Number(cy?.slice(0, -1)) - 5 + '%'}
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={12}
          fontWeight={400}
          fill='#000'
        >
          {t('total')}
        </text>{' '}
        <text
          x={cx}
          y={Number(cy?.slice(0, -1)) + 5 + '%'}
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={16}
          fontWeight={700}
          fill='#000'
        >
          {fakeTotal}
        </text>
      </>
    );
  };

  return (
    <PieChart
      data={fakeData}
      dataKey={'value'}
      pieProps={{ data: fakeData, dataKey: 'value', innerRadius: '60%', paddingAngle: 5 }}
    >
      <Customized component={RenderCenterText} />
    </PieChart>
  );
};
export default RequestPieChart;
