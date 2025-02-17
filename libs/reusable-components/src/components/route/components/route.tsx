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
import { BorderedSection, CenteredLoading, Footer, TagPicker } from '../../../index';
import { createRouteSchema, type RouteType } from '../type/route.schema';
import { PostRouteParams } from '../type/route.type';
import { ROUTE_NAMES } from '../utils/consts';
import { Dispatch } from 'react';
import { FormItem } from './form-item/form-item.style';

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
  const [form] = Form.useForm<RouteType>();
  const { data: routeData, isFetching } = useGetRoute({ dispatch, serviceName });
  const { data: serviceHttpMethods, isFetching: isFetchingServiceHttpMethod } = useGetServiceHttpMethod({ dispatch });
  const { data: serviceProtocols, isFetching: isFetchingServiceProtocol } = useGetServiceProtocol({ dispatch });

  if (isFetching) {
    return <CenteredLoading />;
  }

  const onFinish: FormProps<RouteType>['onFinish'] = (values) => {
    if (serviceName && serviceHttpMethods && serviceProtocols) {
      const { hosts, paths, protocols, methods } = values;

      // TODO: see if values could be passed directly
      const params: PostRouteParams = { hosts, paths, protocols, methods, serviceName };

      const mutateOptions = { onSuccess: () => nextStep() };
      if (routeData) putRoute({ ...params, id: routeData.route.id }, mutateOptions);
      else postRoute(params, mutateOptions);
    }
  };

  let initialValues: Partial<RouteType> = {
    [ROUTE_NAMES.hosts]: [''],
    [ROUTE_NAMES.paths]: [''],
  };

  if (routeData) {
    const {
      route: { hosts, paths, methods, protocols },
    } = routeData;

    initialValues = {
      [ROUTE_NAMES.methods]: methods,
      [ROUTE_NAMES.hosts]: hosts ?? [''],
      [ROUTE_NAMES.paths]: paths ?? [''],
      [ROUTE_NAMES.protocols]: protocols,
    };
  }

  const onRegister = () => form.submit();

  const onReturn = () => previousStep();

  return (
    <>
      <S.Form
        layout={'vertical'}
        initialValues={initialValues}
        onFinish={onFinish}
        form={form}
        onFinishFailed={(e) => console.log('>>>', e)}
      >
        <BorderedSection>
          <Space direction='vertical' size={'middle'}>
            <FormItem name={ROUTE_NAMES.methods} rules={[rule]}>
              <TagPicker
                title={t('uikit.add_methods')}
                menu={serviceHttpMethods}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceHttpMethod}
              />
            </FormItem>

            <FormItem name={ROUTE_NAMES.protocols} rules={[rule]}>
              <TagPicker
                menu={serviceProtocols}
                title={t('uikit.add_protocols')}
                dropdownMinWidth={dropdownMinWidth}
                isLoading={isFetchingServiceProtocol}
              />
            </FormItem>
          </Space>
        </BorderedSection>

        <S.Container>
          <MultiInput rule={[rule]} name={ROUTE_NAMES.paths} form={form} label={t('uikit.path')} />
          <MultiInput rule={[rule]} name={ROUTE_NAMES.hosts} form={form} label={t('uikit.host')} />
        </S.Container>
      </S.Form>

      <Footer onRegister={onRegister} onReturn={onReturn} />
    </>
  );
}
