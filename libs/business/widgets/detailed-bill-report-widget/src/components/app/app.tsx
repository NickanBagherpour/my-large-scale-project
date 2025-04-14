import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';

const clientInfo = {
  aggregatorName: 'شرکت گروه صنایع گلرنگ',
  nationalId: '123456789',
  timeSpan: '1403/11/08 - 1403/12/08',
  clientName: '',
  totalTransactionsCount: '456789',
  commercialBankingShare: '25%',
  operationalTeamShare: '16%',
};

const sum = {
  cumulativeSuccessfulTransactionsCount: 5465136,
  cumulativeUnsuccessfulTransactionsCount: 465465,
  cumulativeTotalTransactionsCount: 123456789,
  cumulativeTotalAmountRiyal: 5456789212000,
};

const clients = [
  {
    client_name: 'تاکسی اینترنتی تپسی',
    service_name: 'سرویس انتقال وجه',
    data: [
      {
        range: 'تا 10 میلیون ریال',
        successfulTransaction: 10000,
        unsuccessfulTransaction: 52,
        totalTransactionsCountAll: 1052,
        feePriceRiyal: 10000,
        totalAmountRiyal: 1250000000,
      },
    ],
  },
];

const App = () => {
  const [t] = useTr();
  return (
    <S.AppContainer title={t('widget_name')}>
      <Summary />
    </S.AppContainer>
  );
};

export default App;
