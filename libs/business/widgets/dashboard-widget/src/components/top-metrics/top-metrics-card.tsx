import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import TopMetricsSection from './top-metrics-section';
import TopMetricsSkeleton from './top-metrics-skeleton';

import * as S from './top-metrics-card.style';
type Props = {
  loading: boolean;
  topMetricItems: any;
};
const TopMetricsCard: React.FC<Props> = ({ loading, topMetricItems }) => {
  const [t] = useTr();
  const theme = useAppTheme();

  return (
    <S.Container>
      {!loading &&
        topMetricItems?.map((t, index) => (
          <TopMetricsSection {...t} showDivider={index !== topMetricItems.length - 1} />
        ))}
      {loading && <TopMetricsSkeleton />}
    </S.Container>
  );
};
export default TopMetricsCard;
