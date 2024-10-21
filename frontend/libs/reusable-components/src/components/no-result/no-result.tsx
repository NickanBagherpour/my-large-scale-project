import React from 'react';

import { useTr } from '@oxygen/translation';
import { Icons, Loading } from '@oxygen/ui-kit';

import * as S from './no-result.style';

type Props = {
  isLoading: boolean;
} & React.ComponentProps<'div'>;

const NoResult = (props: Props) => {
  const { isLoading, ...restOfProps } = props;
  const [t] = useTr();

  return (
    <S.NoResult {...restOfProps}>
      {isLoading ? (
        <Loading containerProps={{ flexGrow: 1 }} />
      ) : (
        <>
          <Icons.EmptyIcon />
          <S.Title>{t('no_result.there_is_no_data_to_show')}</S.Title>
        </>
      )}
    </S.NoResult>
  );
};

export default NoResult;
