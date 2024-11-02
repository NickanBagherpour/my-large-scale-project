import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import GetInfo from '../get-info/get-info';

const App = () => {
  const [t] = useTr();

  return (
    <S.AppContainer title={t('enter_service')}>
      <S.Steps current={1} items={[{ title: t('get_info') }, { title: t('add_scope') }, { title: t('upload_docs') }]} />
      <GetInfo />
    </S.AppContainer>
  );
};

export default App;
