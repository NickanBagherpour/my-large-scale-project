import React, { useState } from 'react';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { AutoComplete } from '@oxygen/reusable-components';

import { getDesktopColumns, getMobileColumns } from '../../utils/second-step-table-utils';

import * as S from './second-step.style';

export default function SecondStep(props) {
  const { setCurrentStep } = props;
  const [t] = useTr();
  const [data, setData] = useState([]);
  const handleSelect = (item) => {
    setData((pre): any => {
      return [...pre, item];
    });
  };

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });
  const revertData = data.slice().reverse();
  const isDisabled = data.length ? false : true;
  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AutoComplete onSelect={handleSelect}></AutoComplete>
      </S.SearchField>

      <S.Table dataSource={revertData} columns={desktopColumns} mobileColumns={mobileColumns} pagination={false} />

      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button disabled={isDisabled} htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.SecondStepContainer>
  );
}
