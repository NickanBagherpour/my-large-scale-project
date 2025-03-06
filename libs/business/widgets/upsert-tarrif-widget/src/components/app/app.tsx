import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import ServiceTarrif from '../service-tariff/service-tariff';
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, PostTariffParams, type AppSchemaType } from '../../types';
import { Footer } from '@oxygen/reusable-components';
import { useGetFee, usePostServiceFee, usePutServiceFee } from '../../services';
import { feeTypeMap, feeTypeMapReverse } from '../../utils';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Loading } from '@oxygen/ui-kit';
import { getWidgetTitle } from '@oxygen/utils';

const App = () => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createAppSchema(t));
  const [form] = Form.useForm<AppSchemaType>();
  const serviceName = useSearchParams().get('service-name');
  const router = useRouter();
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
      // servicePersianName,
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
        serviceTariff: {
          tariff: 'fixed',
          fixed: {
            tariffPrice: fee + '',
          },
        },
      };
    } else if (feeTypeMapReverse[feeType] === 'tiered') {
      initialValues = {
        ...initialValues,
        serviceTariff: {
          tariff: 'tiered',
          tiered: feeSteps.map(({ fee, fromRate, toRate }) => ({
            tariff: fee + '',
            from: fromRate + '',
            to: toRate + '',
          })),
        },
      };
    } else {
      initialValues = {
        ...initialValues,
        serviceTariff: {
          tariff: 'special',
          special: transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
            to: toRate + '',
            from: fromRate + '',
            maximum: max + '',
            minimum: min + '',
            percent: percent + '',
          })),
        },
      };
    }
  }

  const onFinish: FormProps<AppSchemaType>['onFinish'] = (values) => {
    console.log('>>> onFinish', values);

    const {
      serviceName,
      serviceType,
      bankingSharePct,
      opsTeamSharePct,
      fieldNameInElastic,
      transactionTypeInElastic,
      serviceTariff,
    } = values;

    let params: PostTariffParams = {
      serviceName,
      bankingShare: +bankingSharePct,
      operationShare: +opsTeamSharePct,

      type: transactionTypeInElastic + '',
      aggregationType: serviceType + '',
      fieldName: fieldNameInElastic,

      feeType: feeTypeMap[serviceTariff.tariff],
    };

    if (serviceTariff.tariff === 'fixed') {
      // TODO: think of something for these type conversions
      params = { ...params, fee: +serviceTariff.fixed.tariffPrice };
    }

    if (serviceTariff.tariff === 'tiered') {
      const feeSteps: PostTariffParams['feeSteps'] = serviceTariff.tiered.map(({ tariff, to, from }) => ({
        // TODO: think of something for these type conversions
        fee: +tariff,
        fromRate: +from,
        toRate: +to,
      }));
      params = { ...params, feeSteps };
    }

    if (serviceTariff.tariff === 'special') {
      const transactionFees: PostTariffParams['transactionFees'] = serviceTariff.special.map(
        ({ to, from, maximum, minimum }) => ({
          // TODO: think of something for these type conversions
          toRate: +to,
          fromRate: +from,
          max: +maximum,
          min: +minimum,
          percent: 12, // TODO: see if this should exist or not
        })
      );
      params = { ...params, transactionFees };
    }

    if (feeData) updateTarrif(params);
    else createTariff(params);
  };

  if (isPendingFeeData) return <Loading spinning />;

  return (
    <S.AppContainer title={widgetTitle}>
      <Form layout='vertical' onFinish={onFinish} form={form} initialValues={initialValues}>
        <GeneralInfo rule={rule} />
        <ServiceTarrif rule={rule} form={form} />
      </Form>

      <Footer
        onRegister={() => form.submit()}
        onReturn={() => router.back()}
        registerButtonProps={{ loading: isPendingCreate || isPendingEdit }}
      />
    </S.AppContainer>
  );
};

export default App;
