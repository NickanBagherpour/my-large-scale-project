import React from 'react';

import { getValueOrDash } from '@oxygen/utils';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { InfoBox } from '@oxygen/ui-kit';

import { useGetFirstTabReportDataQuery } from '../../services';

import * as S from './first-tab.style';

type FirstTabType = PageProps & {
  id: string;
};

const FirstTab: React.FC<FirstTabType> = (props) => {
  const { id } = props;
  const [t] = useTr();

  const { data, isFetching } = useGetFirstTabReportDataQuery({ id });

  const englishName = data?.name;
  const farsiName = data?.description;

  const item = [
    {
      key: t('first_tab.english_scope_name'),
      value: getValueOrDash(englishName),
    },
    {
      key: t('first_tab.farsi_scope_name'),
      value: getValueOrDash(farsiName),
    },
  ];

  return (
    <S.Firststep>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('first_tab.title')}</S.FirstStepTitle>
      </S.FirstStepHeader>
      <InfoBox loading={isFetching} data={item} margin={'1.6rem 0 0 0'} minColumnCount={2} />
    </S.Firststep>
  );
};
export default FirstTab;
