import { Flex, Skeleton } from 'antd';
import * as S from './top-metrics-skeleton.style';

const TopMetricsSkeleton: React.FC = () => {
  return (
    <S.Container>
      {Array.from({ length: 5 }).map((_, index) => (
        <S.SkeletonCard key={index}>
          <Skeleton.Avatar active size={'large'} shape={'circle'} />
          <Flex gap={5} vertical style={{ width: '100%' }}>
            <S.Title shape='round' active size='small' />
            <Skeleton.Button active shape='round' size='small' block />
            {index !== 4 && <S.CardDivider />}
          </Flex>
        </S.SkeletonCard>
      ))}
    </S.Container>
  );
};
export default TopMetricsSkeleton;
