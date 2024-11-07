import React from 'react';
import * as S from './first-tab.style';
import { useTr } from '@oxygen/translation';
import { Button, InfoBox } from '@oxygen/ui-kit';
import { useGetFirstTabReportDataQuery } from '../../services/get-report.api';

function FirstTab() {
  const [t] = useTr();
const {data, isFetching}=useGetFirstTabReportDataQuery()

  const item = [
    {
      key: t('first_tab.latin_scope_name'),
      value: 'alireza',
    },
    {  key: '',
        value: '',},
    {
      key:  t('first_tab.farsi_scope_name'),
      value: 'ghaffar',
    },
  ];
  return (
    <>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('first_tab.title')}</S.FirstStepTitle>
        <S.ButtonContainer>
          <Button href='/scope-history?id=test' variant='filled' icon={<S.Icon className={'icon-clock'}></S.Icon>}>
            {t('first_tab.view_history_changes')}
          </Button>
          <Button href='' icon={<S.Icon className={'icon-edit'}></S.Icon>}>{t('first_tab.edit')}</Button>
        </S.ButtonContainer>
      </S.FirstStepHeader>
      <InfoBox data={item} margin={'1.6rem 0 0 0'}></InfoBox>
    </>
  );
}

export default FirstTab;
