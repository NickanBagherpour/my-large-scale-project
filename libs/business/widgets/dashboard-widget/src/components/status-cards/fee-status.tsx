import { useTr } from '@oxygen/translation';
import { Flex } from 'antd';
// type Props = {};
import FeeStatusSkeleton from './fee-status-skeleton';
import * as S from './fee-status.style';
type barType = {
  color: 'orange' | 'blue';
  percent?: number | string;
  value?: number | string;
  legendText: string;
};
export type Props = {
  date: string;
  rightBarData: barType;
  leftBarData: barType;
  loading: boolean;
  title: string;
};
const FeeStatus: React.FC<Props> = ({ rightBarData, leftBarData, date, loading, title }) => {
  const [t] = useTr();

  return (
    <S.Container>
      {!loading && (
        <>
          <S.Header>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{date}</S.Subtitle>
          </S.Header>
          <S.Chart>
            <S.SadadBar $color='orange'>
              <S.ChartLabel>
                {' '}
                {rightBarData.percent}
                <span>%</span>
              </S.ChartLabel>
              <S.SadadFee $color='orange'>
                <S.SadadDivider type='vertical' $color='orange' />
                <S.FeeValue>
                  <S.Currency>IRR</S.Currency>
                  <S.ChartLabel>{rightBarData.value}</S.ChartLabel>
                </S.FeeValue>
              </S.SadadFee>
            </S.SadadBar>

            <S.BankBar $color='blue'>
              <S.ChartLabel>
                {leftBarData.percent}
                <span>%</span>
              </S.ChartLabel>
              <S.BankFee $color='blue'>
                <S.BankDivider $color='blue' type='vertical' />
                <S.FeeValue>
                  <S.Currency> IRR</S.Currency>
                  <S.ChartLabel>{leftBarData.value} </S.ChartLabel>
                </S.FeeValue>
              </S.BankFee>
            </S.BankBar>
          </S.Chart>
          <Flex gap={20} align='end'>
            <Flex gap={5}>
              <S.SadadFlag $color='orange' />
              <S.Text>{rightBarData.legendText}</S.Text>
            </Flex>
            <Flex gap={5}>
              <S.BankFlag $color='blue' />
              <S.Text>{leftBarData.legendText}</S.Text>
            </Flex>
          </Flex>
        </>
      )}
      {loading && <FeeStatusSkeleton />}
    </S.Container>
  );
};
export default FeeStatus;
