import React, { useEffect, useState } from 'react';

import { notFound, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { CLIENT_NAME } from '../../utils/consts';
import { FirstStep } from '../first-step/first-step';
import { ThirdStep } from '../third-step/third-step';
import { SecondStep } from '../second-step/second-step';
import { useGetClientInquiryStatusQuery } from '../../services/first-step/get-client-inquiry-status.api';
import { addClientName, addClientStatus, resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import CenteredLoading from '../centered-loading/centered-loading';
type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const clientName: Nullable<string> = searchParams.get(CLIENT_NAME);

  const {
    data: inquiryStatus,
    isFetching: inquiryStatusFetching,
    isSuccess,
  } = useGetClientInquiryStatusQuery({
    'client-name': clientName,
  });
  const clientStatus = inquiryStatus?.clientInquiryStatus?.code;
  const step = inquiryStatus?.clientProgress?.step ?? 0;

  const [currentStep, setCurrentStep] = useState<number>(step);

  useEffect(() => {
    if (!clientName) {
      notFound();
    } else {
      addClientName(dispatch, clientName);
    }
  }, [dispatch, clientName]);

  useEffect(() => {
    if (isSuccess && inquiryStatus) {
      addClientStatus(dispatch, clientStatus);
      setCurrentStep(step);
    }
  }, [isSuccess, step, clientStatus]);

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
        <CenteredLoading />
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
