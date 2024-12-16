import React from 'react';

import { useTr } from '@oxygen/translation';
import { Box, Button } from '@oxygen/ui-kit';

import { useAppState } from '../../../context';

import * as S from './custom-infobox.style';

export type CustomInfoboxProps = {
  handleDeleteButton: () => void;
  data: { latinName: string; persianName: string };
};
function CustomInfobox(props: CustomInfoboxProps) {
  const { handleDeleteButton, data } = props;

  const state = useAppState();
  const [t] = useTr();

  return (
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
        {state.upstreamTab.activeSelect.isInitialized && (
          <S.ButtonContainer>
            <Button variant='outlined' color='error' onClick={handleDeleteButton}>
              <S.TrashIcon className='icon-trash' />
              {t('upstream_tab.delete_button')}
            </Button>
          </S.ButtonContainer>
        )}
      </>
    </S.InfoboxContainer>
  );
}

export default CustomInfobox;
