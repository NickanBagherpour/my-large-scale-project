import React from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, InfoBox } from '@oxygen/ui-kit';

import { useGetFirstTabReportDataQuery } from '../../services/get-report.api';

import * as S from './first-tab.style';

type FirstTabType = PageProps & {
  id: string;
};

const FirstTab: React.FC<FirstTabType> = (props) => {
  const { id } = props;
  const [t] = useTr();
  const { data, isFetching } = useGetFirstTabReportDataQuery();

  const latinName = data && data[0].label;
  const farsiName = data && data[1].label;
  const item = [
    {
      key: t('first_tab.latin_scope_name'),
      value: latinName,
    },
    {
      key: t('first_tab.farsi_scope_name'),
      value: farsiName,
    },
  ];
  return (
    <S.Firststep>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('first_tab.title')}</S.FirstStepTitle>
        <S.ButtonContainer>
          <Button href={`/scope-history?id=${id}`} variant='filled' icon={<S.Icon className={'icon-clock'}></S.Icon>}>
            {t('first_tab.view_history_changes')}
          </Button>
          <Button href={`/scope-edit?id=${id}`} icon={<S.Icon className={'icon-edit'}></S.Icon>}>
            {t('first_tab.edit')}
          </Button>
        </S.ButtonContainer>
      </S.FirstStepHeader>
      <InfoBox loading={isFetching} data={item} margin={'1.6rem 0 0 0'} minColumnCount={2} />
    </S.Firststep>
  );
};
export default FirstTab;
