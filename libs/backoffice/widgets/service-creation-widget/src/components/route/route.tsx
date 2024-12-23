import { Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { ROUTE_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createRouteSchema, RouteParams, RouteType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { nextStep, useAppDispatch, previousStep, updateRouteStep, initialStateValue } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { Container } from '../container/container.style';
import { useGetRoute, usePostRouteMutation, usePutRouteMutation } from '../../services';
import { useSearchParams } from 'next/navigation';
import { useToggle } from '@oxygen/hooks';
import ConfirmModal from '../cofirm-modal/confirm-modal';

const protocoleOptions = [
  { label: 'http', value: 'HTTP' },
  { label: 'https', value: 'HTTPS' },
];

export default function Route() {
  const [form] = Form.useForm<RouteType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createRouteSchema(t));
  const dispatch = useAppDispatch();
  const serviceName = useSearchParams().get('service-name');
  const { data, is404Error, isFetching } = useGetRoute();
  const { mutateAsync: postRoute } = usePostRouteMutation();
  const { mutateAsync: putRoute } = usePutRouteMutation();
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const isInSSO = false;

  const onFinish: FormProps<RouteType>['onFinish'] = async (values) => {
    try {
      if (serviceName) {
        const { host, path, protocole, actionOrMethod } = values;
        const params: RouteParams = { host, path, protocol: protocole, method: actionOrMethod, serviceName };
        await (data?.data ? putRoute(params) : postRoute(params));
        nextStep(dispatch);
        updateRouteStep(dispatch, values);
      }
    } catch {
      //
    }
  };

  const onRegister = () => {
    if (isInSSO) form.submit();
    else toggleConfirmModal();
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (data || is404Error) {
    let initialValues = initialStateValue['route'];
    if (data) {
      const { host, path, method, protocol } = data.data;
      initialValues = { host, path, actionOrMethod: method, protocole: protocol };
    }

    return (
      <>
        <Container>
          <Box>
            <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
              <SearchItemsContainer>
                <FormItem
                  name={ROUTE_NAMES.actionOrMethod}
                  className='span-2'
                  label={t('action_or_method')}
                  rules={[rule]}
                >
                  <Input />
                </FormItem>

                <FormItem name={ROUTE_NAMES.protocole} className='span-2' rules={[rule]} label={t('protocole')}>
                  <Select size={'large'} options={protocoleOptions} />
                </FormItem>

                <FormItem name={ROUTE_NAMES.path} className='span-2' label={t('path')} rules={[rule]}>
                  <Input disabled={!!isInSSO} />
                </FormItem>

                <FormItem name={ROUTE_NAMES.host} className='span-2' label={t('host')} rules={[rule]}>
                  <Input />
                </FormItem>
              </SearchItemsContainer>
            </Form>
          </Box>

          <Footer onRegister={onRegister} onReturn={onReturn} />
        </Container>

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          toggle={toggleConfirmModal}
          onConfirm={() => form.submit()}
          fieldName={t('path')}
        />
      </>
    );
  } else {
    console.log(':)', 'unknown error');
    return 'something went wrong';
  }
}
