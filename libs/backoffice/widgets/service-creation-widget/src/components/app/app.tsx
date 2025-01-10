import { useTr } from '@oxygen/translation';
import { Button, Container } from '@oxygen/ui-kit';
import { AnimatedStatus, GlobalMessageContainer, StatusModal } from '@oxygen/reusable-components';
import GeneralInfo from '../general-info/general-info';
import {
  addInitialStep,
  addServiceName,
  resetMessageAction,
  StepIndex,
  useAppDispatch,
  useAppState,
} from '../../context';
import * as S from './app.style';
import Scope from '../scope/scope';
import Route from '../route/route';
import Upstream from '../upstream/upstream';
import ConfirmData from '../confirm-data/confirm-data';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { getServiceNameFromUrl } from '../../utils/get-valid-service-name';
import { useServiceInquiry } from '../../services';
import { useEffect } from 'react';
import { ROUTES } from '@oxygen/utils';
import CenteredLoading from '../centered-loading/centered-loading';
import { InquiryStatus } from '../../utils/consts';

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
  const router = useRouter();
  const maybeServiceName = useSearchParams().get('service-name');
  const serviceName = getServiceNameFromUrl(maybeServiceName);
  const { data, isSuccess } = useServiceInquiry(serviceName);

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
      {/*
      <AnimatedStatus title='سامانه در حال بررسی اطلاعات وارد شده می‌باشد. لطفا صبور باشید.' status='loading' />
      <br />
      <AnimatedStatus title='درخواست ثبت سرویس با موفقیت ثبت شد.' status='success' />
      <br />
      <AnimatedStatus title='ارتباط با سرور برقرار نشد. لطفا دوباره تلاش نمایید.' status='error' />

      <StatusModal
        isOpen
        status='error'
        loadingProps={{
          title: 'سامانه در حال بررسی اطلاعات وارد شده می‌باشد. لطفا صبور باشید.',
          footer: (
            <Button block variant='outlined' color='primary' disabled>
              <i className='icon-home-empty' />
              {t('service_managment')}
            </Button>
          ),
        }}
        successProps={{
          title: 'درخواست ثبت سرویس با موفقیت ثبت شد.',
          footer: (
            <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              <i className='icon-home-empty' />
              {t('service_managment')}
            </Button>
          ),
        }}
        errorProps={{
          title: 'ارتباط با سرور برقرار نشد. لطفا دوباره تلاش نمایید.  ',
          footer: [
            <Button block href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              <i className='icon-home-empty' />
              {t('service_managment')}
            </Button>,
            <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
              {t('save_in_draft')}
            </Button>,
          ],
        }}
      />
      */}

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
          {steps[step].component}
        </>
      )}
    </Container>
  );
};

export default App;
