import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import Filters from '../filters/filters';

const App = () => {
  const [t] = useTr();

  return (
    <Container title={t('issue_invoice')}>
      <Filters />
    </Container>
  );
};

export default App;
