import React from 'react';

import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Box, Button, Loading } from '@oxygen/ui-kit';

import { useAppState } from '../../../context';

import * as S from './custom-infobox.style';

export type CustomInfoboxProps = {
  handleDeleteButton?: () => void;
  data: { englishName: Nullable<string>; persianName: Nullable<string> };
  loading: boolean;
};
function CustomInfobox(props: CustomInfoboxProps) {
  const { handleDeleteButton, data, loading } = props;

  const state = useAppState();
  const [t] = useTr();

  return (
    <S.Container>
      {loading ? (
        <Loading />
      ) : (
        <S.InfoboxContainer>
          <>
            <Box className='upstream-box'>
              <S.Lable>{t('upstream_tab.info_box_englishName')}</S.Lable>
              <span>{data?.englishName ? data.englishName : '-'}</span>
            </Box>
            <Box className='upstream-box'>
              <S.Lable>{t('upstream_tab.info_box_persianName')}</S.Lable>
              <span>{data?.persianName ? data.persianName : '-'}</span>
            </Box>
            {handleDeleteButton && (
              <S.ButtonContainer>
                <Button variant='outlined' color='error' onClick={handleDeleteButton}>
                  <S.TrashIcon className='icon-trash' />
                  {t('upstream_tab.delete_button')}
                </Button>
              </S.ButtonContainer>
            )}
          </>
        </S.InfoboxContainer>
      )}
    </S.Container>
  );
}

export default CustomInfobox;
