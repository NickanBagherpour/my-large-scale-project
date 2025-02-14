import { Input } from '@oxygen/ui-kit';
import TagPicker from '../tag-picker/tag-picker';
import FormItem from '../form-item/form-item';
import { ROUTE_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createSchemaFieldRule } from 'antd-zod';
import { createRouteSchema, PostRouteParams, RouteType } from '../../types';
import { Form, Space, type FormProps } from 'antd';
import {
  useGetRoute,
  useGetServiceHttpMethod,
  useGetServiceProtocol,
  usePostRouteMutation,
  usePutRouteMutation,
} from '../../services';
import CenteredLoading from '../centered-loading/centered-loading';
import MultiInput from '../multi-input/multi-input';
import Box from '../box/box';
import { nextStep, previousStep, useAppDispatch, useAppState } from '../../context';
import Footer from '../footer/footer';
import * as S from './route.style';
import { getId } from '../../utils/get-id';

const dropdownMinWidth = '17rem';

export default function Route() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createRouteSchema(t));
  const { mutate: postRoute } = usePostRouteMutation();
  const { mutate: putRoute } = usePutRouteMutation();
  const [form] = Form.useForm();
  const { data: routeData, isPending } = useGetRoute();
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  const { data: serviceHttpMethods, isFetching: isFetchingServiceHttpMethod } = useGetServiceHttpMethod();
  const { data: serviceProtocols, isFetching: isFetchingServiceProtocol } = useGetServiceProtocol();
  const isInSso = routeData?.isServiceInSso;

  if (isPending) {
    return <CenteredLoading />;
  }

  const onFinish: FormProps<RouteType>['onFinish'] = (values) => {
    if (isInSso) return void nextStep(dispatch);

    if (serviceName && serviceHttpMethods && serviceProtocols) {
      const { name, hosts, paths, protocols, methods } = values;

      const params: PostRouteParams = {
        name,
        hosts: hosts.map((item) => item.title),
        paths: paths.map((item) => item.title),
        protocols,
        methods,
        serviceName,
      };

      const mutateOptions = { onSuccess: () => nextStep(dispatch) };
      routeData ? putRoute({ ...params, id: routeData.route.id }, mutateOptions) : postRoute(params, mutateOptions);
    }
  };

  let initialValues: Partial<RouteType> = {
    [ROUTE_NAMES.hosts]: [{ code: getId(), title: '' }],
    [ROUTE_NAMES.paths]: [{ code: getId(), title: '' }],
  };
  if (routeData) {
    const {
      route: { name, hosts, paths, methods, protocols },
    } = routeData;

    initialValues = {
      [ROUTE_NAMES.name]: name,
      [ROUTE_NAMES.methods]: methods,
      [ROUTE_NAMES.hosts]: hosts,
      [ROUTE_NAMES.paths]: paths,
      [ROUTE_NAMES.protocols]: protocols,
    };
  }

  const onRegister = () => form.submit();

  const onReturn = () => previousStep(dispatch);

  return (
    <>
      <S.Form disabled={isInSso} layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
        <FormItem label={t('route_name')} name={ROUTE_NAMES.name} rules={[rule]}>
          <Input />
        </FormItem>

        <Box>
          <Space direction='vertical' size={'middle'}>
            <FormItem name={ROUTE_NAMES.methods} rules={[rule]}>
              <TagPicker
                title={t('add_methods')}
                menu={serviceHttpMethods}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceHttpMethod}
              />
            </FormItem>

            <FormItem name={ROUTE_NAMES.protocols} rules={[rule]}>
              <TagPicker
                menu={serviceProtocols}
                title={t('add_protocols')}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceProtocol}
              />
            </FormItem>
          </Space>
        </Box>

        <Box>
          <FormItem name={ROUTE_NAMES.paths} label={t('path')} rules={[rule]}>
            <MultiInput />
          </FormItem>
        </Box>

        <Box>
          <FormItem name={ROUTE_NAMES.hosts} label={t('host')} rules={[rule]}>
            <MultiInput />
          </FormItem>
        </Box>
      </S.Form>

      <Footer onRegister={onRegister} onReturn={onReturn} />
    </>
  );
}
