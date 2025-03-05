import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import ServiceTarrif from '../service-tariff/service-tariff';
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, PostTariffParams, type AppSchemaType } from '../../types';
import { Footer } from '@oxygen/reusable-components';
import { usePostServiceFee } from '../../services';
import { feeTypeMap } from '../../utils';
import { notFound, useSearchParams } from 'next/navigation';

const App = () => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createAppSchema(t));
  const [form] = Form.useForm<AppSchemaType>();
  const { mutate: postFee, isPending: isPendingPostFee } = usePostServiceFee();
  const serviceName = useSearchParams().get('service-name');

  if (!serviceName) {
    return void notFound();
  }

  const initialValues = {
    serviceName,
  };

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
    postFee(params);
  };

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
        registerButtonProps={{ loading: isPendingPostFee }}
      />
    </S.AppContainer>
  );
};

export default App;
