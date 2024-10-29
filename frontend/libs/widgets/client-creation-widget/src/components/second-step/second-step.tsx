import React from 'react';

import { Box, Button, Table } from '@oxygen/ui-kit';
import AutoComplete from '../../../../../reusable-components/src/components/autocomplete/autocomplete';

import * as S from './second-step.style';
import { useTr } from '@oxygen/translation';

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

  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AutoComplete onSelect={handleSelect}></AutoComplete>
      </S.SearchField>
      <Box>
        <Table></Table>
      </Box>
      <div className={'footer'}>
        <Button variant={'outlined'} onClick={handleReturn}>
          بازگشت
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          ثبت اطلاعات
          <i className={'icon-arrow-up'}></i>
        </Button>
      </div>
    </S.SecondStepContainer>
  );
}
