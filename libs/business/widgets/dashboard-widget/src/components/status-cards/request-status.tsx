import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import RequestPieChart from './request-pie-chart';
import * as S from './request-status.style';
// type Props = {};
const RequestStatus: React.FC = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  return (
    <S.Container>
      <S.ChartDataContainer>
        <S.Title>{t('request_status')}</S.Title>
        <Flex gap={14} vertical>
          <Flex gap={6}>
            <S.Flag $color={theme.secondary._400} />
            <S.FlagText>{t('final_confirmation')}</S.FlagText>
          </Flex>
          <Flex gap={6}>
            <S.Flag $color={theme.primary._500} />
            <S.FlagText>{t('waiting_to_confirm')}</S.FlagText>
          </Flex>
          <Flex gap={6}>
            <S.Flag $color={theme.error._500} />
            <S.FlagText>{t('rejected')}</S.FlagText>{' '}
          </Flex>
        </Flex>
      </S.ChartDataContainer>
      <RequestPieChart />
    </S.Container>
  );
};
export default RequestStatus;
