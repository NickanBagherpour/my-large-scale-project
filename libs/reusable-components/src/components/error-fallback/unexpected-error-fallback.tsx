import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import { ContentNotFoundImage } from '../../assets';

type Props = {
  reset?: () => void;
};
const UnexpectedErrorFallback: React.FC<Props> = (props) => {
  const [t] = useTr();
  return (
    <ErrorView
      title={t('error.unspicific')}
      description={t('error.unknown_error')}
      image={<ContentNotFoundImage style={{ marginTop: '5rem' }} />}
    />
  );
};
export default UnexpectedErrorFallback;
