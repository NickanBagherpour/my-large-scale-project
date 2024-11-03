import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { AutoComplete } from '@oxygen/reusable-components';

import { getDesktopColumns, getMobileColumns } from '../../utils/second-step-table-utils';

import * as S from './second-step.style';

type SecondStep = PageProps & {
  setIsDisable: any;
};

export const SecondStep: React.FC<SecondStep> = (props) => {
  const { setIsDisable } = props;
  const [t] = useTr();
  const [data, setData] = useState([]);

  const handleSelect = (item) => {
    setData((pre): any => {
      return [...pre, item];
    });
  };

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });
  const revertData = data.slice().reverse();
  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AutoComplete onSelect={handleSelect}></AutoComplete>
      </S.SearchField>

      <S.Table dataSource={revertData} columns={desktopColumns} mobileColumns={mobileColumns} pagination={false} />
    </S.SecondStepContainer>
  );
};
