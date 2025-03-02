import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import ServiceTarrif from '../service-tariff/service-tariff';

const App = () => {
  const [t] = useTr();

  return (
    <S.AppContainer title={t('add_tarrif_setting')}>
      <GeneralInfo />
      <ServiceTarrif />
    </S.AppContainer>
  );
};

export default App;
