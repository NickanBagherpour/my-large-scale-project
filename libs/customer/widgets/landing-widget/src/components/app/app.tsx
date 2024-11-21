import Customers from '../customers/customers';
import Faq from '../faq/faq';
import HeroSection from '../hero-section/hero-section';
import JoinUs from '../join-us/join-us';
import Vision from '../vision/vision';
import Why from '../why/why';
import * as S from './app.style';

const App = () => {
  return (
    <S.Main>
      <S.WithBg>
        <HeroSection />
        <Why />
        <JoinUs />
        <Vision />
        <Customers />
        <Faq />
      </S.WithBg>
    </S.Main>
  );
};

export default App;
