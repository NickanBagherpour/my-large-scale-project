import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import RequestPieChart from './request-pie-chart';
import RequestStatusSkeleton from './request-status-skeleton';
import * as S from './request-status.style';
type Props = {
  title: string;
  pieData?: { name: string; value: number; fill: string; title: string }[];
  total?: number;
  loading: boolean;
};
const RequestStatus: React.FC<Props> = ({ title, pieData, total, loading }) => {
  const [t] = useTr();
  return (
    <S.Container>
      {!loading ? (
        <>
          <S.ChartDataContainer>
            <S.Title>{title}</S.Title>
            <Flex gap={14} vertical>
              {pieData?.map((p) => (
                <Flex gap={6}>
                  <S.Flag $color={p?.fill} />
                  <S.FlagText>{p?.title}</S.FlagText>
                </Flex>
              ))}
            </Flex>
          </S.ChartDataContainer>
          <RequestPieChart data={pieData} total={total} />
        </>
      ) : (
        <RequestStatusSkeleton />
      )}
    </S.Container>
  );
};
export default RequestStatus;
