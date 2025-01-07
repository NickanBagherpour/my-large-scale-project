import React from 'react';

import { useTr } from '@oxygen/translation';
import { Loading } from '@oxygen/ui-kit';

import * as S from './no-result.style';

type Props = {
  isLoading: boolean;
  link?: string;
  title?: string;
  handleClick?: () => any;
} & React.ComponentProps<'div'>;

const NoResult = (props: Props) => {
  const { isLoading, title, link, handleClick, ...restOfProps } = props;
  const [t] = useTr();

  const displayTitle = title || t('no_result.there_is_no_data_to_show');

  return (
    <S.NoResult {...restOfProps}>
      {isLoading ? (
        <Loading containerProps={{ flexGrow: 1 }} />
      ) : (
        <S.BoxContainer>
          <S.Empty description={displayTitle} />
          {link ||
            (handleClick && (
              <S.ButtonContainer>
                <S.ReturnButton
                  size={'middle'}
                  variant={'outlined'}
                  color={'primary'}
                  href={link}
                  onClick={handleClick}
                >
                  {t('button.return')}
                </S.ReturnButton>
              </S.ButtonContainer>
            ))}
        </S.BoxContainer>
      )}
    </S.NoResult>
  );
};

export default NoResult;
