import { useTr } from '@oxygen/translation';
import { Flex } from 'antd';
// type Props = {};
import * as S from './fee-status.style';
const FeeStatus: React.FC = () => {
  const [t] = useTr();
  const date = '14خرداد ';
  const sadadFee = '213,480,456,475';
  const bankFee = '1,213,456,475';
  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('fee_status')}</S.Title>
        <S.Subtitle>{date}</S.Subtitle>
      </S.Header>
      <S.Chart>
        <S.SadadBar>
          <S.ChartLabel>70%</S.ChartLabel>
          <S.SadadFee>
            <S.SadadDivider type='vertical' />
            <S.FeeValue>
              <S.Currency>IRR</S.Currency>
              <S.ChartLabel>{sadadFee}</S.ChartLabel>
            </S.FeeValue>
          </S.SadadFee>
        </S.SadadBar>

        <S.BankBar>
          <S.ChartLabel>30%</S.ChartLabel>
          <S.BankFee>
            <S.BankDivider type='vertical' />
            <S.FeeValue>
              <S.Currency> IRR</S.Currency>
              <S.ChartLabel>{bankFee} </S.ChartLabel>
            </S.FeeValue>
          </S.BankFee>
        </S.BankBar>
      </S.Chart>
      <Flex gap={20} align='end'>
        <Flex gap={5}>
          <S.SadadFlag />
          <S.Text>{t('sadad_share')}</S.Text>
        </Flex>
        <Flex gap={5}>
          <S.BankFlag />
          <S.Text>{t('bank_share')}</S.Text>
        </Flex>
      </Flex>
    </S.Container>
  );
};
export default FeeStatus;
