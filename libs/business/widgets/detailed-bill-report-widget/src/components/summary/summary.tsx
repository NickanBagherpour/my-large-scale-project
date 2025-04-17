import { addThousandSeparator } from '@oxygen/utils';
import * as S from './summary.style';
import { useTr } from '@oxygen/translation';
import { InfoData } from '../../types';
import { getJalalliMonths } from '../../utils/consts';

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

  const jalalliMonths = getJalalliMonths(t);
  const info = [
    {
      key: t('aggregator_name'), // TODO: see if this should be always aggregator_name or client_name
      value: (
        <S.Name>
          <S.Icon className='icon-award' /> {name} {/* TODO: see if icon should be added to all names */}
        </S.Name>
      ),
    },
    { key: t('national_id'), value: nationalCode },
    { key: t('time_range'), value: `${jalalliMonths[billingMonth]} ${billingYear}` },
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
        <S.TotalTitle>{t('total_amount_of_commission')}</S.TotalTitle>
        <S.Count>{addThousandSeparator(sumAmount)}</S.Count>
      </S.Total>
    </S.Container>
  );
}
