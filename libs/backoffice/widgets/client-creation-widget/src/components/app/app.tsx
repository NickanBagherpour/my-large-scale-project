import React, { useEffect, useState } from 'react';

import { notFound, useSearchParams } from 'next/navigation';

import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import FirstStep from '../first-step/first-step';
import { ThirdStep } from '../third-step/third-step';
import { SecondStep } from '../second-step/second-step';
import { addClientName, addClientStatus, resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import { useClientInquiryStatusQuery } from '../../services/first-step/get-client-inquiry-status.api';
import { Loading } from '@oxygen/ui-kit';

import * as S from './app.style';
type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const clientName: Nullable<string> = searchParams.get('client-name');

  const {
    data: inquiryStatus,
    isFetching: inquiryStatusFetching,
    isSuccess,
  } = useClientInquiryStatusQuery({
    'client-name': clientName,
  });
  const clientStatus = inquiryStatus?.clientInquiryStatus.code;
  const step = inquiryStatus?.clientProgress?.step ?? 0;

  const [currentStep, setCurrentStep] = useState<number>(step);

  useEffect(() => {
    if (!clientName) {
      notFound();
    } else {
      addClientName(dispatch, clientName);
      addClientStatus(dispatch, clientStatus);
    }
  }, [dispatch, clientName]);

  useEffect(() => {
    if (isSuccess && inquiryStatus) {
      setCurrentStep(step);
    }
  }, [isSuccess, step]);

  const stepsItem = [
    { title: t('progress_bar.first_step'), component: <FirstStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.second_step'), component: <SecondStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.third_step'), component: <ThirdStep setCurrentStep={setCurrentStep} /> },
  ];

  return (
    <S.AppContainer title={t('create_new_client')}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      {inquiryStatusFetching ? (
        <Loading />
      ) : (
        <>
          <S.Steps items={stepsItem} current={currentStep} />
          {stepsItem[currentStep]?.component}
        </>
      )}
    </S.AppContainer>
  );
};

export default App;
