import React, { useState, useEffect } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Loading } from '@oxygen/ui-kit';

import OrganizationDefineStep from '../organization-define-step/organization-define-step';
import RepresentativeDefineStep from '../representative-define-step/representative-define-step';
import ServiceSelectStep from '../service-select-step/service-select-step';
import FinalConfirmStep from '../final-confirm-step/final-confirm-step';

import { resetErrorMessageAction, useAppDispatch, useAppState, updateAllStateFromDraftsAction } from '../../context';
import { useQueryParams } from '@oxygen/hooks';
import { useGetRequestDataFromDraftsMutationQuery } from '../../services';

import * as S from './app.style';
import { progressStep, StepsItemKey } from '../../utils/consts';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { message, ...fetchState } = useAppState();
  const dispatch = useAppDispatch();

  const { mutate: draftsMutate, isPending: draftsIsPending } = useGetRequestDataFromDraftsMutationQuery();

  const queryParams = useQueryParams();

  const submissionId = queryParams.get('submissionId');
  const progress = Number(queryParams.get('progress'));
  let stepValue: StepsItemKey = StepsItemKey.OrganizationDefineStep;

  if (progress) {
    stepValue = progressStep[progress];
  }

  // Run draftsMutate only once when submissionId and progress are available
  useEffect(() => {
    if (submissionId && progress) {
      draftsMutate(submissionId, {
        onSuccess: (data) => {
          console.log('get data from drafts successful:', data);
          updateAllStateFromDraftsAction(dispatch, data.data);
        },
        onError: (error) => {
          console.error('Request registration organization define step failed:', error);
        },
      });
    }
  }, [submissionId, progress, draftsMutate]);

  const [currentStep, setCurrentStep] = useState(stepValue);

  const stepsItem = [
    {
      title: t('progress_bar.organization_define_step'),
      Content: <OrganizationDefineStep setCurrentStep={setCurrentStep} draft={progress ? true : false} />,
    },
    {
      title: t('progress_bar.representative_define_step'),
      Content: <RepresentativeDefineStep setCurrentStep={setCurrentStep} />,
    },
    { title: t('progress_bar.service_select_step'), Content: <ServiceSelectStep setCurrentStep={setCurrentStep} /> },
    {
      title: t('progress_bar.final_confirm_step'),
      Content: <FinalConfirmStep setCurrentStep={setCurrentStep} />,
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
