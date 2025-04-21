import { Flex } from 'antd';
import * as S from './request-status-skeleton.style';
const RequestStatusSkeleton: React.FC = () => {
  return (
    <>
      <S.Container>
        <Flex vertical gap={5}>
          <S.Title active shape='round' size='small' block />
          <S.Text active shape='round' size='small' block />
          <S.Text active shape='round' size='small' block />
          <S.Text active shape='round' size='small' block />
        </Flex>
      </S.Container>
      <S.StyledSVG viewBox='0 0 160 160'>
        <S.StyledCircle cx='75' cy='75' r='55' />
      </S.StyledSVG>
    </>
  );
};
export default RequestStatusSkeleton;
