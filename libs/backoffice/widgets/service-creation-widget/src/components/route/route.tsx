import { Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { ROUTE_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createRouteSchema, GeneralInfoValuesType, RouteType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { updateGetInfoStep, nextStep, useAppDispatch, useAppState, previousStep, updateRouteStep } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import * as S from './route.style';

const options = [
  { label: 'گزینه اول', value: '1' },
  { label: 'گزینه دوم', value: '2' },
  { label: 'گزینه سوم', value: '3' },
];

export default function Route() {
  const [form] = Form.useForm<RouteType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createRouteSchema(t));
  const dispatch = useAppDispatch();
  const state = useAppState();

  const onFinish: FormProps<RouteType>['onFinish'] = async (values) => {
    nextStep(dispatch);
    updateRouteStep(dispatch, values);
  };

  const onRegister = () => {
    form.submit();
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  return (
    <S.Container>
      <Box>
        <Form layout={'vertical'} initialValues={state.route} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <FormItem name={ROUTE_NAMES.actionOrMethod} className='span-2' label={t('action_or_method')} rules={[rule]}>
              <Input />
            </FormItem>

            <FormItem name={ROUTE_NAMES.protocole} className='span-2' rules={[rule]} label={t('protocole')}>
              <Select size={'large'} options={options} />
            </FormItem>

            <FormItem name={ROUTE_NAMES.path} className='span-2' label={t('path')} rules={[rule]}>
              <Input />
            </FormItem>

            <FormItem name={ROUTE_NAMES.host} className='span-2' label={t('host')} rules={[rule]}>
              <Input />
            </FormItem>
          </SearchItemsContainer>
        </Form>
      </Box>

      <Footer onRegister={onRegister} onReturn={onReturn} />
    </S.Container>
  );
}
