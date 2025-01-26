'use client';
import { useTr } from '@oxygen/translation';
import ErrorView from './error-view';
import notFoundAnimation from '../../assets/media/Error_400.json';

// type Props = {
//   reset?: () => void;
// };
const NotFoundFallback = (props) => {
  const [t] = useTr();
  return (
    <ErrorView
      errorCode={t('message.code_404')}
      title={t('message.not_found')}
      description={t('message.not_found_desc')}
      animationData={notFoundAnimation}
    />
  );
};
export default NotFoundFallback;
