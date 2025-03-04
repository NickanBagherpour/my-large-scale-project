import { useTr } from '@oxygen/translation';
import GeneralInfo from '../general-info/general-info';
import * as S from './app.style';
import ServiceTarrif from '../service-tariff/service-tariff';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { createAppSchema, type AppSchemaType } from '../../types/app.schema';
import { Footer } from '@oxygen/reusable-components';

const App = () => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createAppSchema(t));
  const [form] = Form.useForm<AppSchemaType>();

  const onFinish = (values: unknown) => {
    console.log('>>> onFinish', values);
  };

  return (
    <S.AppContainer title={t('add_tarrif_setting')}>
      <Form layout='vertical' onFinish={onFinish} form={form} onFinishFailed={(e) => void console.log('>>>', e)}>
        <GeneralInfo rule={rule} />
        <ServiceTarrif rule={rule} form={form} />
      </Form>

      <Footer onRegister={() => form.submit()} onReturn={() => void console.log('>>> returning')} />
    </S.AppContainer>
  );
};

export default App;
