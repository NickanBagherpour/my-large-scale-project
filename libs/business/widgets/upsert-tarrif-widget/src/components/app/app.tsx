import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import ServiceTarrif from '../service-tariff/service-tariff';
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, type AppSchemaType } from '../../types';
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
    const {
      serviceName,
      serviceType,
      bankingSharePct,
      opsTeamSharePct,
      fieldNameInElastic,
      transactionTypeInElastic,
      serviceTariff,
    } = values;

    console.log('>>> values', values);

    //   "aggregationType": "1",
    //   "fieldName": "string",
    //   "type": "string"

    // TODO: THINK OF SOMETHING BETTER FOR THESE TYPE CONVERSIONS
    postFee({
      serviceName,
      bankingShare: +bankingSharePct,
      operationShare: +opsTeamSharePct,

      type: serviceType + '',
      aggregationType: transactionTypeInElastic,
      fieldName: fieldNameInElastic,

      feeType: feeTypeMap[serviceTariff.tariff],

      feeSteps: serviceTariff.tariff === 'tiered' ? serviceTariff.tiered : null,
      fee: serviceTariff.tariff === 'fixed' ? serviceTariff.fixed : null,
      transactionFees: serviceTariff.tariff === 'special' ? serviceTariff.special : null,
    });
  };

  return (
    <S.AppContainer title={t('add_tarrif_setting')}>
      <Form layout='vertical' onFinish={onFinish} form={form} initialValues={initialValues}>
        <GeneralInfo rule={rule} />
        <ServiceTarrif rule={rule} form={form} />
      </Form>

      <Footer onRegister={() => form.submit()} onReturn={() => void console.log('>>> returning')} />
    </S.AppContainer>
  );
};

export default App;
