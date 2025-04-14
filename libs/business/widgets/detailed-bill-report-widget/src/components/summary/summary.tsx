import { addThousandSeparator } from '@oxygen/utils';
import * as S from './summary.style';
import { useTr } from '@oxygen/translation';

const clientInfo = {
  aggregatorName: 'شرکت گروه صنایع گلرنگ',
  nationalId: '123456789',
  timeSpan: '1403/11/08 - 1403/12/08',
  totalTransactionsCount: '456789',
  commercialBankingShare: '25%',
  operationalTeamShare: '16%',

  successfulTransactionsCnt: 5465136,
  unsuccessfulTransactionsCnt: 465465,
  totalTransactionsCnt: 123456789,
  totalAmountRiyal: 5456789212000,
};

// TODO: SEE IF YOU COULD USE Infobox FOR THIS.
export default function Summary() {
  const [t] = useTr();
  const info = [
    { key: t('aggregator_name'), value: clientInfo.aggregatorName },
    { key: t('national_id'), value: clientInfo.nationalId },
    { key: t('time_range'), value: clientInfo.timeSpan },
    { key: t('time_range'), value: clientInfo.timeSpan },
    { key: t('cumulative_successful_tx'), value: clientInfo.successfulTransactionsCnt },
    { key: t('cumulative_unsuccessful_tx'), value: clientInfo.unsuccessfulTransactionsCnt },
  ];

  return (
    <S.Container>
      <S.Grid>
        {info.map(({ key, value }, idx) => (
          <S.Item>
            <S.Key key={idx}>{key}</S.Key>
            <S.Value>{value}</S.Value>
          </S.Item>
        ))}
      </S.Grid>

      <S.Total>
        <span>{t('cumulative_total_transactions')}</span>
        <S.Count>{addThousandSeparator(clientInfo.totalTransactionsCnt)}</S.Count>
      </S.Total>
    </S.Container>
  );
}
