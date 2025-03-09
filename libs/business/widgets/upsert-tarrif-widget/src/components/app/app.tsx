import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, type AppSchemaType } from '../../types';
import { GlobalMessageContainer, ServiceTariff } from '@oxygen/reusable-components';
import { useGetFee, usePostServiceFee, usePutServiceFee } from '../../services';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Loading, Container } from '@oxygen/ui-kit';
import { getWidgetTitle, ROUTES } from '@oxygen/utils';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useApp } from '@oxygen/hooks';
import { prepareParams } from '../../utils';
import { getInitialValues } from '../../utils/get-initial-data';
import { useQueryClient } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';

const { TARIFF_LIST, TARIFF_DETAILS, UPSERT_TARRIF } = RQKEYS.BUSINESS;

const App = () => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createAppSchema(t));
  const [form] = Form.useForm<AppSchemaType>();
  const serviceName = useSearchParams().get('service-name');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = useAppState();
  const { data: feeData, isPending: isPendingFeeData } = useGetFee(serviceName);
  const { mutate: createTariff, isPending: isPendingCreate } = usePostServiceFee();
  const { mutate: updateTarrif, isPending: isPendingEdit } = usePutServiceFee();
  const widgetTitle = getWidgetTitle({
    primaryTitle: feeData?.servicePersianName,
    secondaryTitle: feeData?.serviceName,
    defaultTitle: t('add_tarrif_setting'),
  });
  const { notification } = useApp();
  const queryClient = useQueryClient();

  if (!serviceName) {
    return void notFound();
  }

  const initialValues = getInitialValues(serviceName, feeData);

  const invalidateAndRedirect = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [TARIFF_LIST.GET_LIST] }),
      queryClient.invalidateQueries({ queryKey: [TARIFF_DETAILS.GET_LIST, serviceName], refetchType: 'inactive' }),
      queryClient.invalidateQueries({ queryKey: [UPSERT_TARRIF.TARIFF, serviceName], refetchType: 'active' }),
    ]);
    router.push(ROUTES.BUSINESS.TARIFF_LIST);
  };

  const onFinish: FormProps<AppSchemaType>['onFinish'] = (values) => {
    const params = prepareParams(values);

    if (feeData) {
      updateTarrif(params, {
        async onSuccess() {
          notification.success({ message: t('edit_was_successful') });
          await invalidateAndRedirect();
        },
      });
    } else {
      createTariff(params, {
        async onSuccess() {
          notification.success({ message: t('create_was_successful') });
          await invalidateAndRedirect();
        },
      });
    }
  };

  if (isPendingFeeData) return <Loading spinning />;

  return (
    <Container title={widgetTitle}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />

      <Form layout='vertical' onFinish={onFinish} form={form} initialValues={initialValues}>
        <GeneralInfo rule={rule} />
        <ServiceTariff rule={rule} form={form} type='upsert' />
      </Form>

      <S.Footer
        onRegister={() => form.submit()}
        onReturn={() => router.back()}
        registerButtonProps={{ loading: isPendingCreate || isPendingEdit }}
      />
    </Container>
  );
};

export default App;
