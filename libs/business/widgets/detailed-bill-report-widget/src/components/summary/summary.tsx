import { addThousandSeparator } from '@oxygen/utils';
import * as S from './summary.style';
import { useTr } from '@oxygen/translation';
import { InfoData } from '../../types';
import { jalliMonths } from '../../utils/consts';

type Props = Omit<InfoData, 'clientDataList'>;

// TODO: SEE IF YOU COULD USE Infobox FOR THIS.
export default function Summary(props: Props) {
  const {
    name,
    sumAmount,
    billingYear,
    billingMonth,
    nationalCode,
    totalTransactions,
    failedTransactions,
    successTransactions,
  } = props;

  const [t] = useTr();
  const info = [
    { key: t('aggregator_name'), value: name },
    { key: t('national_id'), value: nationalCode },
    { key: t('time_range'), value: `${jalliMonths[billingMonth]} ${billingYear}` },
    { key: t('cumulative_successful_tx'), value: addThousandSeparator(successTransactions) },
    { key: t('cumulative_unsuccessful_tx'), value: addThousandSeparator(failedTransactions) },
    { key: t('cumulative_total_transactions'), value: addThousandSeparator(totalTransactions) },
  ];

  return (
    <S.Container>
      <S.Grid>
        {info.map(({ key, value }, idx) => (
          <S.Item key={idx}>
            <S.Key>{key}</S.Key>
            <S.Value>{value}</S.Value>
          </S.Item>
        ))}
      </S.Grid>

      <S.Total>
        <span>{t('total_amount_of_commission')}</span>
        <S.Count>{addThousandSeparator(sumAmount)}</S.Count>
      </S.Total>
    </S.Container>
  );
}
