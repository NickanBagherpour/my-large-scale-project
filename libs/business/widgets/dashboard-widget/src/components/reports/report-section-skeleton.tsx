import { Flex, Skeleton } from 'antd';
import * as S from './report-section-skeleton.style';
type Props = {
  color: 'primary' | 'secondary';
};
const ReportSectionSkeleton: React.FC<Props> = ({ color }) => {
  return (
    <S.Container $color={color}>
      <S.Title shape='round' size='small' active />
      <S.Body $color={color}>
        <Flex gap={10} vertical style={{ width: '100%' }}>
          <Skeleton.Button active shape='round' size='small' block />
          <Skeleton.Button active shape='round' size='small' block />
        </Flex>
        <Skeleton.Avatar active size={'large'} shape={'circle'} />
      </S.Body>
    </S.Container>
  );
};
export default ReportSectionSkeleton;
