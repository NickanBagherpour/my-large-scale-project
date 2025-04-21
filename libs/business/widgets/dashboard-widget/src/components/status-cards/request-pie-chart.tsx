import { FC } from 'react';
import { Customized } from 'recharts';
import { useTr } from '@oxygen/translation';
import { PieChart } from '@oxygen/ui-kit';
export type Props = {
  data?: any;
  total?: number;
};
const RequestPieChart: React.FC<Props> = ({ data, total }) => {
  const [t] = useTr();
  return (
    <PieChart
      data={data}
      dataKey={'value'}
      pieProps={{ data: data, dataKey: 'value', innerRadius: '60%', paddingAngle: 5 }}
    >
      <Customized component={RenderCenterText} total={total} />
    </PieChart>
  );
};
export default RequestPieChart;
const RenderCenterText: FC<any> = ({ cx, cy, total }) => {
  const [t] = useTr();
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
        {total && t('total')}
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
        {total}
      </text>
    </>
  );
};
