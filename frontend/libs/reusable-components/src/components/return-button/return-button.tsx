import { useRouter } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Button, ButtonProps } from '@oxygen/ui-kit';

const ReturnButton: React.FC<ButtonProps> = (props) => {
  const router = useRouter();
  const [t] = useTr();
  const handleReturn = () => {
    router.back();
  };
  return (
    <Button {...props} onClick={handleReturn}>
      {t('button.return')}
    </Button>
  );
};
export default ReturnButton;
