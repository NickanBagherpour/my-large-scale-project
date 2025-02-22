import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { CenteredLoading, GlobalMessageContainer, Route } from '@oxygen/reusable-components';
import GeneralInfo from '../general-info/general-info';
import {
  addInitialStep,
  addServiceName,
  nextStep,
  previousStep,
  resetMessageAction,
  StepIndex,
  useAppDispatch,
  useAppState,
} from '../../context';
import * as S from './app.style';
import Scope from '../scope/scope';
import Upstream from '../upstream/upstream';
import ConfirmData from '../confirm-data/confirm-data';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { getServiceNameFromUrl, InquiryStatus } from '../../utils';
import { useServiceInquiry } from '../../services';
import { useEffect } from 'react';
import { ROUTES } from '@oxygen/utils';

const App = () => {
  const [t] = useTr();
  const { message, stepStatuses, step } = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const maybeServiceName = useSearchParams().get('service-name');
  const serviceName = getServiceNameFromUrl(maybeServiceName);
  const { data, isSuccess } = useServiceInquiry(serviceName);

  const steps = [
    { name: 'generalInfo', title: 'general_info', component: <GeneralInfo /> },
    {
      name: 'route',
      title: 'route',
      component: (
        <Route
          dispatch={dispatch}
          nextStep={() => nextStep(dispatch)}
          previousStep={() => previousStep(dispatch)}
          serviceName={serviceName}
          errors={stepStatuses.find((item) => item.name === 'route')?.error}
        />
      ),
    },
    { name: 'scope', title: 'scope', component: <Scope /> },
    { name: 'upstream', title: 'upstream', component: <Upstream /> },
    { name: 'confirmData', title: 'confirm_data', component: <ConfirmData /> },
  ] as const;

  useEffect(() => {
    if (!serviceName) notFound();
    else addServiceName(dispatch, serviceName);
  }, [dispatch, serviceName]);

  useEffect(() => {
    if (isSuccess) {
      const { serviceInquiryStatus, serviceProgress } = data;
      const step = serviceProgress?.step ?? 1; // If `serviceProgress` is undefined (e.g., the service does not exist), default to step 0, indicating that the process should start from the first step.
      const statusCode = serviceInquiryStatus.code;
      const serviceExists = statusCode === InquiryStatus.SERVICE_ALREADY_EXISTS;

      if (serviceExists) {
        router.replace(ROUTES.BACKOFFICE.SERVICE_LIST);
      } else {
        addInitialStep(dispatch, (step - 1) as StepIndex);
      }
    }
  }, [isSuccess, dispatch, data, router]);

  return (
    <Container title={t('create_new_service')}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      {step === null ? (
        <CenteredLoading />
      ) : (
        <>
          <S.Steps
            current={step}
            items={steps.map(({ title }, idx) => ({
              title: t(title),
              status: stepStatuses[idx].status,
            }))}
          />
          {/* @ts-expect-error TODO: fix this */}
          {steps[step]?.component}
        </>
      )}
    </Container>
  );
};

export default App;
