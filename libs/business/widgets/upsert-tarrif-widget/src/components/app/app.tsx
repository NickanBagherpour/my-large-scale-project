import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, PostTariffParams, type AppSchemaType } from '../../types';
import {
  emptySpecialTariff,
  emptyTieredTariff,
  feeTypeMap,
  feeTypeMapReverse,
  GlobalMessageContainer,
  TARIFF,
  ServiceTariff,
} from '@oxygen/reusable-components';
import { useGetFee, usePostServiceFee, usePutServiceFee } from '../../services';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Loading, Container } from '@oxygen/ui-kit';
import { getWidgetTitle } from '@oxygen/utils';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';

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

  if (!serviceName) {
    return void notFound();
  }

  let initialValues: Partial<AppSchemaType> = {
    serviceName,
  };

  if (feeData) {
    const {
      serviceName,
      feeSteps,
      fee,
      type,
      feeType,
      fieldName,
      bankingShare,
      operationShare,
      aggregationType,
      transactionFees,
    } = feeData;

    initialValues = {
      serviceName,
      serviceType: aggregationType,
      bankingSharePct: bankingShare + '', // TODO: see if this should exist or not
      opsTeamSharePct: operationShare + '', // TODO: see if this should exist or not
      fieldNameInElastic: fieldName,
      transactionTypeInElastic: type,
    };

    if (feeTypeMapReverse[feeType] === 'fixed') {
      initialValues = {
        ...initialValues,
        type: 'fixed',
        fixed: fee,
      };
    } else if (feeTypeMapReverse[feeType] === 'tiered') {
      initialValues = {
        ...initialValues,
        type: 'tiered',
        tiered:
          feeSteps.map(({ fee, fromRate, toRate }) => ({
            tariff: fee,
            from: fromRate + '',
            to: toRate + '',
          })) ?? emptyTieredTariff,
      };
    } else {
      initialValues = {
        ...initialValues,
        type: 'special',
        special:
          transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
            to: toRate,
            from: fromRate,
            maximum: max,
            minimum: min,
            percent: percent + '',
          })) ?? emptySpecialTariff,
      };
    }
  } else {
    initialValues = {
      [TARIFF.special]: emptySpecialTariff,
      [TARIFF.tiered]: emptyTieredTariff,
    };
  }

  const onFinish: FormProps<AppSchemaType>['onFinish'] = (values) => {
    const {
      serviceName,
      serviceType,
      bankingSharePct,
      opsTeamSharePct,
      fieldNameInElastic,
      transactionTypeInElastic,
      special,
      tiered,
      fixed,
      type,
    } = values;

    let params: PostTariffParams = {
      serviceName,
      bankingShare: +bankingSharePct,
      operationShare: +opsTeamSharePct,

      type: transactionTypeInElastic + '',
      aggregationType: serviceType + '',
      fieldName: fieldNameInElastic,

      feeType: feeTypeMap[type],
    };

    if (type === 'fixed') {
      // TODO: think of something for these type conversions
      params = { ...params, fee: fixed };
    }

    if (type === 'tiered') {
      const feeSteps: PostTariffParams['feeSteps'] = tiered.map(({ tariff, to, from }) => ({
        // TODO: think of something for these type conversions
        fee: +tariff,
        fromRate: +from,
        toRate: +to,
      }));
      params = { ...params, feeSteps };
    }

    if (type === 'special') {
      const transactionFees: PostTariffParams['transactionFees'] = special.map(
        ({ to, from, maximum, minimum, percent }) => ({
          // TODO: think of something for these type conversions
          toRate: to,
          fromRate: from,
          max: maximum,
          min: minimum,
          percent: +percent, // TODO: see if this should exist or not
        })
      );
      params = { ...params, transactionFees };
    }

    if (feeData) updateTarrif(params);
    else createTariff(params);
  };

  if (isPendingFeeData) return <Loading spinning />;

  return (
    <Container title={widgetTitle}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />

      <Form
        layout='vertical'
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
        onFinishFailed={(e) => console.log('>>> onFinishFailed', e)}
      >
        <GeneralInfo rule={rule} />
        <ServiceTariff rule={rule} form={form} />
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
