import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import serverErrorAnimation from '../../assets/media/Error_500.json';

// type Props = {};
const ServerErrorFallback = () => {
  const [t] = useTr();
  return (
    <ErrorView
      errorCode={t('message.code_500')}
      title={t('message.server_error')}
      description={t('message.server_error_desc')}
      animationData={serverErrorAnimation}
    />
  );
};
export default ServerErrorFallback;
