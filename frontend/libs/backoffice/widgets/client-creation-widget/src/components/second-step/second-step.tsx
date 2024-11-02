import React, { useState } from 'react';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { AutoComplete } from '@oxygen/reusable-components';

import { getDesktopColumns, getMobileColumns } from '../../utils/second-step-table-utils';
import { useGetTableDataQuery } from '../../services/get-table.data.api';

import * as S from './second-step.style';

export default function SecondStep(props) {
  const { setCurrentStep } = props;
  const [t] = useTr();
  const [data, setData] = useState([]);
  // const { data, isFetching, isError, refetch } = useGetTableDataQuery();

  const handleSelect = (item) => {
    setData((pre): any => {
      return [...pre, item];
    });
  };

  // console.log(';', data);

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });
  const revertData = data.slice().reverse();
  const isDisabled = data ? false : true;
  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AutoComplete onSelect={handleSelect}></AutoComplete>
      </S.SearchField>

      <S.Table
        dataSource={revertData}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        pagination={false}
        // loading={isFetching}
      />

      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          بازگشت
        </Button>
        <Button disabled={isDisabled} htmlType={'submit'} onClick={handleSubmit}>
          ثبت اطلاعات
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.SecondStepContainer>
  );
}
