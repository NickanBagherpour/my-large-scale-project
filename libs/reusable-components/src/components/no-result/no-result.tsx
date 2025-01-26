import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Loading } from '@oxygen/ui-kit';

import * as S from './no-result.style';

type Props = {
  isLoading: boolean;
  link?: string;
  title?: string;
  hasReturnButton?: boolean;
  children?: ReactNode;
} & React.ComponentProps<'div'>;

const NoResult = (props: Props) => {
  const { isLoading, title, link, hasReturnButton, children, ...restOfProps } = props;
  const [t] = useTr();
  const router = useRouter();

  const displayTitle = title || t('message.there_is_no_data_to_show');

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.NoResult {...restOfProps}>
      {isLoading ? (
        <Loading containerProps={{ flexGrow: 1 }} />
      ) : (
        <S.BoxContainer>
          <S.Empty description={displayTitle} />
          {link ||
            (hasReturnButton && (
              <S.ButtonContainer>
                <S.ReturnButton
                  size={'middle'}
                  variant={'outlined'}
                  color={'primary'}
                  href={link}
                  onClick={handleReturn}
                >
                  {t('button.return')}
                </S.ReturnButton>
              </S.ButtonContainer>
            ))}
          {children}
        </S.BoxContainer>
      )}
    </S.NoResult>
  );
};

export default NoResult;
