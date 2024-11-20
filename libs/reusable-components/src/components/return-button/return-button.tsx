'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import { useTr } from '@oxygen/translation';
import { Button, ButtonProps } from '@oxygen/ui-kit';

const ReturnButton: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  const router = useRouter();
  const path = usePathname();

  const [t] = useTr();
  const handleReturn = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (!onClick) {
      router.back();
    }
  };

  return (
    <Button variant='outlined' onClick={handleReturn} {...rest}>
      {children || t('button.return')}
    </Button>
  );
};
export default ReturnButton;
