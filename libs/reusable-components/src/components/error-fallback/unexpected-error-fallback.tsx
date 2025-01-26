import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import { ContentNotFoundImage } from '../../assets';

type Props = {
  reset?: () => void;
};
const UnexpectedErrorFallback = (props) => {
  const [t] = useTr();
  return (
    <ErrorView
      title={t('message.unspecific')}
      description={t('message.unspecific_desc')}
      image={<ContentNotFoundImage style={{ marginTop: '5rem' }} />}
    />
  );
};
export default UnexpectedErrorFallback;
