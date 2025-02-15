import { useTr } from '@oxygen/translation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form, Space, type FormProps } from 'antd';
import {
  useGetRoute,
  useGetServiceHttpMethod,
  useGetServiceProtocol,
  usePostRouteMutation,
  usePutRouteMutation,
} from '../services';
import MultiInput from './multi-input/multi-input';
import * as S from './route.style';
import { BorderedSection, CenteredLoading, Footer, TagPicker } from '@oxygen/reusable-components';
import { createRouteSchema, RouteType } from '../type/route.schema';
import { PostRouteParams } from '../type/route.type';
import { ROUTE_NAMES } from '../utils/consts';
import { getId } from '../utils/get-id';
import { Dispatch } from 'react';

const dropdownMinWidth = '17rem';

type Props = {
  serviceName: string;
  dispatch: Dispatch<any>;
  nextStep: () => void;
  previousStep: () => void;
};

export default function Route(props: Props) {
  const { serviceName, dispatch, previousStep, nextStep } = props;
  const [t] = useTr();
  const rule = createSchemaFieldRule(createRouteSchema(t));
  const { mutate: postRoute } = usePostRouteMutation({ dispatch, serviceName });
  const { mutate: putRoute } = usePutRouteMutation({ dispatch, serviceName });
  const [form] = Form.useForm();
  const { data: routeData, isFetching } = useGetRoute({ dispatch, serviceName });
  const { data: serviceHttpMethods, isFetching: isFetchingServiceHttpMethod } = useGetServiceHttpMethod({ dispatch });
  const { data: serviceProtocols, isFetching: isFetchingServiceProtocol } = useGetServiceProtocol({ dispatch });
  const isInSso = routeData?.isServiceInSso;

  if (isFetching) {
    return <CenteredLoading />;
  }

  const onFinish: FormProps<RouteType>['onFinish'] = (values) => {
    if (isInSso) return void nextStep();

    if (serviceName && serviceHttpMethods && serviceProtocols) {
      const { hosts, paths, protocols, methods } = values;

      const params: PostRouteParams = {
        hosts: hosts.map((item) => item.title),
        paths: paths.map((item) => item.title),
        protocols,
        methods,
        serviceName,
      };

      const mutateOptions = { onSuccess: () => nextStep() };
      if (routeData) putRoute({ ...params, id: routeData.route.id }, mutateOptions);
      else postRoute(params, mutateOptions);
    }
  };

  let initialValues: Partial<RouteType> = {
    [ROUTE_NAMES.hosts]: [{ code: getId(), title: '' }],
    [ROUTE_NAMES.paths]: [{ code: getId(), title: '' }],
  };
  if (routeData) {
    const {
      route: { hosts, paths, methods, protocols },
    } = routeData;

    initialValues = {
      [ROUTE_NAMES.methods]: methods,
      [ROUTE_NAMES.hosts]: hosts,
      [ROUTE_NAMES.paths]: paths,
      [ROUTE_NAMES.protocols]: protocols,
    };
  }

  const onRegister = () => form.submit();

  const onReturn = () => previousStep();

  return (
    <>
      <S.Form disabled={isInSso} layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
        <BorderedSection>
          <Space direction='vertical' size={'middle'}>
            <S.FormItem name={ROUTE_NAMES.methods} rules={[rule]}>
              <TagPicker
                title={t('add_methods')}
                menu={serviceHttpMethods}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceHttpMethod}
              />
            </S.FormItem>

            <S.FormItem name={ROUTE_NAMES.protocols} rules={[rule]}>
              <TagPicker
                menu={serviceProtocols}
                title={t('add_protocols')}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceProtocol}
              />
            </S.FormItem>
          </Space>
        </BorderedSection>

        <S.Container>
          <S.FormItem name={ROUTE_NAMES.paths} label={t('path')} rules={[rule]}>
            <MultiInput />
          </S.FormItem>

          <S.FormItem name={ROUTE_NAMES.hosts} label={t('host')} rules={[rule]}>
            <MultiInput />
          </S.FormItem>
        </S.Container>
      </S.Form>

      <Footer onRegister={onRegister} onReturn={onReturn} />
    </>
  );
}
