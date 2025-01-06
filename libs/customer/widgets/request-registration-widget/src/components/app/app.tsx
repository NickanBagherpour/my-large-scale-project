import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Loading } from '@oxygen/ui-kit';
import { useGetRequestQuery } from '../../services';

import FirstStep from '../first-step/first-step';
import FourthStep from '../fourth-step/fourth-step';
import { ThirdStep } from '../third-step/third-step';
import SecondStep from '../second-step/second-step';
import { resetErrorMessageAction, useAppDispatch, useAppState, updateAllStateFromDraftsAction } from '../../context';
import { useQueryParams } from '@oxygen/hooks';
import { useGetRequestDataFromDraftsMutationQuery } from '../../services/draftsRequest-data';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { message, ...fetchState } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const id: Nullable<string> = searchParams.get('id');
  const { data: requestData, isFetching } = useGetRequestQuery();
  const { mutate: draftsMutate, isPending: draftsIsPending } = useGetRequestDataFromDraftsMutationQuery();

  enum StepsItemKey {
    FirstStep = 0,
    SecondStep = 1,
    ThirdStep = 2,
    FourthStep = 3,
  }

  const queryParams = useQueryParams();

  const submissionId = queryParams.get('submissionId');
  const stepName = queryParams.get('stepName');
  console.log('submissionId : ', submissionId, 'stepName : ', stepName);
  let stepValue: StepsItemKey = StepsItemKey.FirstStep;
  if (stepName) {
    if (stepName === 'تعریف سازمان') {
      stepValue = StepsItemKey.SecondStep;
    } else if (stepName === 'تعریف نمایندگان') {
      stepValue = StepsItemKey.ThirdStep;
    } else if (stepName === 'انتخاب سرویس') {
      stepValue = StepsItemKey.FourthStep;
    }
  }

  // Run draftsMutate only once when submissionId and stepName are available
  useEffect(() => {
    if (submissionId && stepName) {
      draftsMutate(submissionId, {
        onSuccess: (data) => {
          console.log('get data from drafts successful:', data);
          updateAllStateFromDraftsAction(dispatch, data.data);
        },
        onError: (error) => {
          console.error('Request registration first step failed:', error);
        },
      });
    }
  }, [submissionId, stepName, draftsMutate]);

  const [currentStep, setCurrentStep] = useState(stepValue);

  const stepsItem = [
    {
      title: t('progress_bar.first_step'),
      Content: (
        <FirstStep
          setCurrentStep={setCurrentStep}
          data={requestData}
          loading={isFetching}
          draft={stepName ? true : false}
        />
      ),
    },
    { title: t('progress_bar.second_step'), Content: <SecondStep setCurrentStep={setCurrentStep} /> },
    { title: t('progress_bar.third_step'), Content: <ThirdStep setCurrentStep={setCurrentStep} /> },
    {
      title: t('progress_bar.fourth_step'),
      Content: <FourthStep setCurrentStep={setCurrentStep} data={requestData} loading={isFetching} />,
    },
  ];

  return (
    <S.AppContainer title={t('request_registration')}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Loading spinning={draftsIsPending}>
        {!draftsIsPending && <S.Steps items={stepsItem} current={currentStep} />}
      </Loading>
      {stepsItem[currentStep].Content}
    </S.AppContainer>
  );
};

export default App;
