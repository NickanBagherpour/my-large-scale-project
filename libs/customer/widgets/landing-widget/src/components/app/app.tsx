import Customers from '../customers/customers';
import Faq from '../faq/faq';
import Footer from '../footer/footer';
import Hero from '../hero/hero';
import JoinUs from '../join-us/join-us';
import Vision from '../vision/vision';
import Why from '../why/why';
import * as S from './app.style';

const App = () => {
  return (
    <S.Main>
      <S.WithBg>
        <Hero />
        <Why />
        <JoinUs />
        <Vision />
        <Customers />
        <Faq />
        <Footer />
      </S.WithBg>
    </S.Main>
  );
};

export default App;
