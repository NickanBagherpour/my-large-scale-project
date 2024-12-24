import React, { useState } from 'react';

import { getValueOrDash, ROUTES } from '@oxygen/utils';
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

  const { data, isFetching } = useGetFirstTabReportDataQuery({ id });

  const [{ editLoading, historyLoadign }, setLoading] = useState({
    editLoading: false,
    historyLoadign: false,
  });

  const latinName = data?.name;
  const farsiName = data?.description;

  const item = [
    {
      key: t('first_tab.latin_scope_name'),
      value: getValueOrDash(latinName),
    },
    {
      key: t('first_tab.farsi_scope_name'),
      value: getValueOrDash(farsiName),
    },
  ];

  const handleEdit = () => {
    setLoading((prev) => ({
      ...prev,
      editLoading: true,
    }));
  };
  const handleHistory = () => {
    setLoading((prev) => ({
      ...prev,
      historyLoadign: true,
    }));
  };
  return (
    <S.Firststep>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('first_tab.title')}</S.FirstStepTitle>
        <S.ButtonContainer>
          <Button
            href={`${ROUTES.BACKOFFICE.SCOPE_HISTORY}?id=${id}`}
            variant='filled'
            icon={<S.Icon className={'icon-clock'}></S.Icon>}
            onClick={handleHistory}
            loading={historyLoadign}
          >
            {t('first_tab.view_history_changes')}
          </Button>
          <Button
            href={`${ROUTES.BACKOFFICE.EDIT_SCOPE}?id=${id}`}
            icon={<S.Icon className={'icon-edit'} />}
            onClick={handleEdit}
            loading={editLoading}
          >
            {t('first_tab.edit')}
          </Button>
        </S.ButtonContainer>
      </S.FirstStepHeader>
      <InfoBox loading={isFetching} data={item} margin={'1.6rem 0 0 0'} minColumnCount={2} />
    </S.Firststep>
  );
};
export default FirstTab;
