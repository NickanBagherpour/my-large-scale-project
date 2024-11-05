import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
};
const ReturnButton: React.FC<Props> = (props) => {
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
