import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import FirstStep from '../first-step/first-step';
import { SecondStep } from '../second-step/second-step';
import { ThirdStep } from '../third-step/third-step';
import FourthStep from '../fourth-step/fourth-step';

import * as S from './app.style';
import { Button } from '@oxygen/ui-kit';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [currentStep, setCurrentStep] = useState(2);
  const [isDisable, setIsDisable] = useState(false);

  const stepsItem = [
    { title: t('progress_bar.first_step'), Content: <FirstStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.second_step'), Content: <SecondStep setIsDisable={setIsDisable} /> },
    { title: t('progress_bar.third_step'), Content: <ThirdStep /> },
    { title: t('progress_bar.fourth_step'), Content: <FourthStep /> },
  ];
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };

  return (
    <S.AppContainer title={t('create_new_client')}>
      <S.Steps items={stepsItem} current={currentStep} />
      {stepsItem[currentStep].Content}

      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button disabled={isDisable} htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.AppContainer>
  );
};

export default App;
