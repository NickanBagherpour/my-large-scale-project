import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import FirstStep from '../first-step/first-step';
import FourthStep from '../fourth-step/fourth-step';
import { ThirdStep } from '../third-step/third-step';
import { SecondStep } from '../second-step/second-step';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const stepsItem = [
    { title: t('progress_bar.first_step'), Content: <FirstStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.second_step'), Content: <SecondStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.third_step'), Content: <ThirdStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.fourth_step'), Content: <FourthStep setCurrentStep={setCurrentStep} /> },
  ];

  return (
    <S.AppContainer title={t('create_new_client')}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.Steps items={stepsItem} current={currentStep} />
      {stepsItem[currentStep].Content}
    </S.AppContainer>
  );
};

export default App;
