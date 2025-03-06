import React from 'react';

import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Box, Button, Loading } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import * as S from './custom-infobox.style';

export type CustomInfoboxProps = {
  handleDeleteButton?: (item: boolean) => void;
  data: { englishName: Nullable<string>; persianName: Nullable<string> };
  loading: boolean;
};
function CustomInfobox(props: CustomInfoboxProps) {
  const { handleDeleteButton, data, loading } = props;

  const [t] = useTr();

  return (
    <S.Container>
      {loading ? (
        <Loading />
      ) : (
        <S.InfoboxContainer>
          <Box className='upstream-box'>
            <S.Lable>{t('upstream_tab.info_box_englishName')}</S.Lable>
            <span>{getValueOrDash(data.englishName)}</span>
          </Box>
          <Box className='upstream-box'>
            <S.Lable>{t('upstream_tab.info_box_persianName')}</S.Lable>
            <span>{getValueOrDash(data.persianName)}</span>
          </Box>
          {handleDeleteButton && (
            <S.ButtonContainer>
              <Button variant={'outlined'} color='error' onClick={() => handleDeleteButton(true)}>
                <S.TrashIcon className='icon-trash' />
                <p>{t('upstream_tab.delete_button')}</p>
              </Button>
            </S.ButtonContainer>
          )}
        </S.InfoboxContainer>
      )}
    </S.Container>
  );
}

export default CustomInfobox;
