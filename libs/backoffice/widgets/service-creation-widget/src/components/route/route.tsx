import { Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { ROUTE_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createRouteSchema, RouteParams, RouteType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { nextStep, useAppDispatch, previousStep, initialStateValue, useAppState } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { Container } from '../container/container.style';
import {
  useGetRoute,
  useGetServiceHttpMethod,
  useGetServiceProtocol,
  usePostRouteMutation,
  usePutRouteMutation,
} from '../../services';
import { useToggle } from '@oxygen/hooks';
import ConfirmModal from '../cofirm-modal/confirm-modal';
import { convertCodeTitles } from '../../utils/convert-enums';

export default function Route() {
  const [form] = Form.useForm<RouteType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createRouteSchema(t));
  const dispatch = useAppDispatch();
  const state = useAppState();
  const { serviceName } = useAppState();
  const { data, isFetching } = useGetRoute();
  const { mutate: postRoute } = usePostRouteMutation();
  const { mutate: putRoute } = usePutRouteMutation();
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const isInSSO = data?.data.isServiceInSso;
  const { data: serviceHttpMethods, isFetching: isFetchingServiceHttpMethod } = useGetServiceHttpMethod();
  const { data: serviceProtocols, isFetching: isFetchingServiceProtocol } = useGetServiceProtocol();

  const onFinish: FormProps<RouteType>['onFinish'] = (values) => {
    if (serviceName && serviceHttpMethods && serviceProtocols) {
      const { host, path, protocol, actionOrMethod } = values;

      const currentHttpMethod = serviceHttpMethods.find((s) => s.code === actionOrMethod);
      const currentProtocole = serviceProtocols.find((s) => s.code === protocol);

      const params: RouteParams = { host, path, protocol: currentProtocole!, method: currentHttpMethod!, serviceName };
      const mutateOptions = { onSuccess: () => nextStep(dispatch) };
      data?.data ? putRoute(params, mutateOptions) : postRoute(params, mutateOptions);
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

  let initialValues = initialStateValue['route'];
  if (data) {
    const { host, path, method, protocol } = data.data;
    initialValues = { host, path, actionOrMethod: method.code, protocol: protocol.code };
  }

  const inputErrors = state.stepStatuses.find((i) => i.name === 'route')?.error;
  const getValidateStatus = (name: string) => (inputErrors?.[name] ? 'error' : undefined);

  return (
    <>
      <Container>
        <Box>
          <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
            <SearchItemsContainer>
              <FormItem
                name={ROUTE_NAMES.actionOrMethod}
                validateStatus={getValidateStatus(ROUTE_NAMES.actionOrMethod)}
                className='span-2'
                label={t('action_or_method')}
                rules={[rule]}
              >
                <Select
                  size={'large'}
                  loading={isFetchingServiceHttpMethod}
                  options={convertCodeTitles(serviceHttpMethods)}
                />
              </FormItem>

              <FormItem
                name={ROUTE_NAMES.protocol}
                validateStatus={getValidateStatus(ROUTE_NAMES.protocol)}
                className='span-2'
                rules={[rule]}
                label={t('protocol')}
              >
                <Select
                  size={'large'}
                  loading={isFetchingServiceProtocol}
                  options={convertCodeTitles(serviceProtocols)}
                />
              </FormItem>

              <FormItem
                name={ROUTE_NAMES.path}
                validateStatus={getValidateStatus(ROUTE_NAMES.path)}
                className='span-2'
                label={t('path')}
                rules={[rule]}
              >
                <Input disabled={!!isInSSO} />
              </FormItem>

              <FormItem
                name={ROUTE_NAMES.host}
                validateStatus={getValidateStatus(ROUTE_NAMES.host)}
                className='span-2'
                label={t('host')}
                rules={[rule]}
              >
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
}
