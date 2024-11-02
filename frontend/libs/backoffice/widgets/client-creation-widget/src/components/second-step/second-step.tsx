import React from 'react';

import { Box, Button, Table } from '@oxygen/ui-kit';

import * as S from './second-step.style';
import { useTr } from '@oxygen/translation';
import { AutoComplete } from '@oxygen/reusable-components';

export default function SecondStep(props) {
  const { setCurrentStep } = props;

  const [t] = useTr();

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };
  const handleSelect = (item) => {
    console.log('handle select value is:', item);
  };

  const dataSource = [];

  const columns = [
    {
      title: t('step_two.row'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('step_two.service_name'),
      dataIndex: 'age',
      key: 'name',
    },
    {
      title: t('step_two.persian_name'),
      dataIndex: 'address',
      key: 'name',
    },
    {
      title: t('step_two.scope'),
    },
    {
      title: t('step_two.url'),
    },
    {
      title: t('step_two.version'),
    },
    {
      title: '',
    },
    {
      title: '',
    },
  ];

  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AutoComplete onSelect={handleSelect}></AutoComplete>
      </S.SearchField>

      <S.Table dataSource={dataSource} columns={columns} pagination={false} />

      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          بازگشت
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          ثبت اطلاعات
          <i className={'icon-arrow-up'}></i>
        </Button>
      </S.Footer>
    </S.SecondStepContainer>
  );
}
