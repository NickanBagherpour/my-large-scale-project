import { Skeleton } from 'antd';
import * as S from './Fee-status-skeleton.style';
const FeeStatusSkeleton: React.FC = () => {
  return (
    <>
      <S.Title shape='round' active size='small' />
      <Skeleton.Button active shape='round' size='large' block />
      <Skeleton.Button active shape='round' size='small' block />
    </>
  );
};
export default FeeStatusSkeleton;
