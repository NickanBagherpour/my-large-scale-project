import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';

const App = () => {
  const [t] = useTr();

  return (
    <S.AppContainer title={t('add_tarrif_setting')}>
      <GeneralInfo />
    </S.AppContainer>
  );
};

export default App;
