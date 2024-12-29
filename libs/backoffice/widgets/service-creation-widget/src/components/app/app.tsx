import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import GeneralInfo from '../general-info/general-info';
import { addInitialStep, addServiceName, resetMessageAction, useAppDispatch, useAppState } from '../../context';
import Scope from '../scope/scope';
import * as S from './app.style';
import Route from '../route/route';
import Upstream from '../upstream/upstream';
import ConfirmData from '../confirm-data/confirm-data';
import { notFound, redirect, useSearchParams } from 'next/navigation';
import { getServiceNameFromUrl } from '../../utils/get-valid-service-name';
import { useServiceInquiry } from '../../services';
import { useEffect } from 'react';
import { ROUTES } from '@oxygen/utils';
import CenteredLoading from '../centered-loading/centered-loading';

export const steps = [
  { name: 'generalInfo', title: 'general_info', component: <GeneralInfo /> },
  { name: 'route', title: 'route', component: <Route /> },
  { name: 'scope', title: 'scope', component: <Scope /> },
  { name: 'upstream', title: 'upstream', component: <Upstream /> },
  { name: 'confirmData', title: 'confirm_data', component: <ConfirmData /> },
] as const;

const App = () => {
  const [t] = useTr();
  const { message, stepStatuses, step } = useAppState();
  const dispatch = useAppDispatch();
  const maybeServiceName = useSearchParams().get('service-name');
  const serviceName = getServiceNameFromUrl(maybeServiceName);
  const { data, isFetching, isSuccess } = useServiceInquiry(serviceName);

  useEffect(() => {
    if (!serviceName) notFound();
    else addServiceName(dispatch, serviceName);
  }, [dispatch, serviceName]);

  useEffect(() => {
    if (isSuccess) {
      const step = data.serviceProgress?.step ?? 0; // If `serviceProgress` is undefined (e.g., the service does not exist), default to step 0, indicating that the process should start from the first step.
      if (step === 5) {
        redirect(ROUTES.BACKOFFICE.SERVICE_LIST);
      } else {
        addInitialStep(dispatch, step);
      }
    }
  }, [isSuccess, dispatch, data]);

  return (
    <Container title={t('create_new_service')}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      {isFetching ? (
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
          {steps[step].component}
        </>
      )}
    </Container>
  );
};

export default App;
