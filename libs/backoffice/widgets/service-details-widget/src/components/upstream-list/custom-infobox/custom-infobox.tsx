import React from 'react';

import { useTr } from '@oxygen/translation';
import { Box, Button, Loading } from '@oxygen/ui-kit';

import { useAppState } from '../../../context';

import * as S from './custom-infobox.style';

export type CustomInfoboxProps = {
  handleDeleteButton: () => void;
  data: { latinName: string; persianName: string };
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
            <Box>
              <S.Lable>{t('upstream_tab.info_box_latinName')}</S.Lable>
              <span>{data.latinName ? data.latinName : '-'}</span>
            </Box>
            <Box>
              <S.Lable>{t('upstream_tab.info_box_persianName')}</S.Lable>
              <span>{data.persianName ? data.persianName : '-'}</span>
            </Box>

            <S.ButtonContainer>
              <Button variant='outlined' color='error' onClick={handleDeleteButton}>
                <S.TrashIcon className='icon-trash' />
                {t('upstream_tab.delete_button')}
              </Button>
            </S.ButtonContainer>
          </>
        </S.InfoboxContainer>
      )}
    </S.Container>
  );
}

export default CustomInfobox;
