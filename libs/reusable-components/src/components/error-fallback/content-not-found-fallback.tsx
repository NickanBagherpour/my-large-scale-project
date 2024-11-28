import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import { ContentNotFoundImage } from '../../assets';

// type Props = {};
const ContentNotFoundFallback = () => {
  const [t] = useTr();
  return (
    <ErrorView
      title={t('error.content_not_found')}
      description={t('error.content_not_found_desc')}
      image={<ContentNotFoundImage style={{ marginTop: '5rem' }} />}
    />
  );
};
export default ContentNotFoundFallback;
