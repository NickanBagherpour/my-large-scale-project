import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
// import notFoundAnimation from '../../assets/media/Error_400.json';

type Props = {
  reset?: () => void;
};
const NotFoundFallback: React.FC<Props> = (props) => {
  const [t] = useTr();
  return (
    <ErrorView
      errorCode={t('error.code_404')}
      title={t('error.not_found')}
      description={t('error.not_found_desc')}
      animationData={''}
    />
  );
};
export default NotFoundFallback;
