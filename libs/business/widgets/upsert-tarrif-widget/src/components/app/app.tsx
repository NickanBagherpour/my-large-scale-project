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
import { notFound, useSearchParams } from 'next/navigation';
import { Loading } from '@oxygen/ui-kit';

const App = () => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createAppSchema(t));
  const [form] = Form.useForm<AppSchemaType>();
  const serviceName = useSearchParams().get('service-name');
  const { data, isFetching } = useGetFee(serviceName);
  const { mutate: createTariff, isPending: isPendingCreate } = usePostServiceFee();
  const { mutate: updateTarrif, isPending: isPendingEdit } = usePutServiceFee();

  if (!serviceName) {
    return void notFound();
  }

  let initialValues: Partial<AppSchemaType> = {
    serviceName,
  };

  if (data) {
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
      servicePersianName,
    } = data;

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
      console.log('>>>', 'the type is tiered');
    } else {
      console.log('>>>', 'the type is special');
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

    console.log('>>> posting fees', params);
    if (data) updateTarrif(params);
    else createTariff(params);
  };

  if (!data) return <Loading spinning />;

  return (
    <S.AppContainer title={t('add_tarrif_setting')}>
      <Form
        layout='vertical'
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
        onFinishFailed={(e) => void console.log('>>> onFinishFailed', e)}
      >
        <GeneralInfo rule={rule} />
        <ServiceTarrif rule={rule} form={form} />
      </Form>

      <Footer
        onRegister={() => form.submit()}
        onReturn={() => void console.log('>>> returning')}
        registerButtonProps={{ loading: isPendingCreate }}
      />
    </S.AppContainer>
  );
};

export default App;
