import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import { ContentNotFoundImage } from '../../assets';

// type Props = {};
const AccessDenied = () => {
  const [t] = useTr();
  return (
    <ErrorView
      errorCode={t('message.code_403')}
      margin={false}
      title={t('message.access_denied')}
      description={t('message.access_denied_desc')}
      image={<ContentNotFoundImage style={{ marginTop: '5rem' }} />}
    />
  );
};
export default AccessDenied;
