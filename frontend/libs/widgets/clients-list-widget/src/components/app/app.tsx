import Filters from '../filters/filters';
import Header from '../header/header';
import * as S from './app.style';

const App = () => {
  return (
    <S.AppContainer>
      <Header clientsCount={375} />
      <Filters />
    </S.AppContainer>
  );
};

export default App;
