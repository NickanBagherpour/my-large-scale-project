import React, { useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer, Select, Typography } from '@oxygen/ui-kit';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { FormSchema } from '../../types';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';

import * as S from './edit-route.style';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useGetRouteDetailsQuery, useGetServiceHttpMethod, useGetServiceProtocol } from '../../services';
import { useApp } from '@oxygen/hooks';
import { useEditRouteMutation } from '../../services/post-edit-route.api';

type EditScopeProps = PageProps & {
  //
};

const EditRoute: React.FC<EditScopeProps> = () => {
  const [t] = useTr();
  const { notification } = useApp();

  const [form] = Form.useForm();
  const rule = createSchemaFieldRule(FormSchema(t));
  const submitClick = () => form.submit();
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');
  if (!servicename) {
    redirect('/not-found');
  }

  const params = servicename;

  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery(params);
  const { data: serviceHttpMethods, isFetching: isFetchingServiceHttpMethod } = useGetServiceHttpMethod();
  const { data: serviceProtocols, isFetching: isFetchingServiceProtocol } = useGetServiceProtocol();
  const { mutate, isPending } = useEditRouteMutation();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  useEffect(() => {
    // Ensure routeDetails and select options are available before setting form values
    if (routeDetails && serviceHttpMethods && serviceProtocols) {
      form.setFieldsValue({
        [FORM_ITEM_NAMES.method]: routeDetails?.method?.code,
        [FORM_ITEM_NAMES.protocol]: routeDetails?.protocol?.code,
        [FORM_ITEM_NAMES.path]: routeDetails.path,
        [FORM_ITEM_NAMES.host]: routeDetails.host,
      });
    }
  }, [routeDetails, serviceHttpMethods, serviceProtocols, form]);

  // Transform serviceHttpMethods and serviceProtocols into AntD Select options
  const methodsSelectOptions = serviceHttpMethods?.map((method) => ({
    label: method.title, // Assuming 'name' contains a human-readable value
    value: method.code, // Assuming 'code' is used for identifying the method
  }));

  const protocolsSelectOptions = serviceProtocols?.map((protocol) => ({
    label: protocol.title, // Assuming 'name' contains a human-readable value
    value: protocol.code, // Assuming 'code' is used for identifying the protocol
  }));

  const onFinish = async (values) => {
    const selectedMethod = methodsSelectOptions.find((option) => option.value === values[FORM_ITEM_NAMES.method]);
    const selectedProtocol = protocolsSelectOptions.find((option) => option.value === values[FORM_ITEM_NAMES.protocol]);

    // Dynamically build the payload
    const payload = {
      ...(servicename && { serviceName: servicename }), // Include only if servicename is present
      ...(selectedMethod && {
        method: {
          code: selectedMethod?.value,
          title: selectedMethod?.label,
        },
      }), // Include method only if selected
      ...(selectedProtocol && {
        protocol: {
          code: selectedProtocol?.value,
          title: selectedProtocol?.label,
        },
      }), // Include protocol only if selected
      ...(values[FORM_ITEM_NAMES.path] && { path: values[FORM_ITEM_NAMES.path] }), // Include path only if filled
      ...(values[FORM_ITEM_NAMES.host] && { host: values[FORM_ITEM_NAMES.host] }), // Include host only if filled
    };

    try {
      mutate(payload, {
        onSuccess: () => {
          notification.success({
            message: t('success_notif'),
          });
          router.back();
        },
        onError: (error: any) => {
          console.log('Error object:', error);

          // Extract the error message from the response if available
          const errorMessage = error.response?.data?.message || t('unexpected_error');

          // Show the error message in the notification
          notification.error({
            message: t(errorMessage),
          });
        },
      });
    } catch (error) {
      console.error('Error while sending the payload:', error);
    }
  };

  return (
    <S.EditRouteContainer>
      <div className={'form-wrapper'}>
        <h3>{t('edit_route')}</h3>
        <Form
          layout='vertical'
          onFinish={onFinish}
          form={form}
          initialValues={{
            [FORM_ITEM_NAMES.method]: routeDetails?.method?.code,
            [FORM_ITEM_NAMES.protocol]: routeDetails?.protocol?.code,
            [FORM_ITEM_NAMES.path]: routeDetails?.path,
            [FORM_ITEM_NAMES.host]: routeDetails?.host,
          }}
        >
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.method} className={'span-2'} label={t('method')} rules={[rule]}>
              <Select options={methodsSelectOptions} placeholder={t('placeholders.method')} size='large' />
            </Form.Item>

            <Form.Item name={FORM_ITEM_NAMES.protocol} className={'span-2'} label={t('protocol')} rules={[rule]}>
              <Select options={protocolsSelectOptions} placeholder={t('placeholders.protocol')} size='large' />
            </Form.Item>

            <Form.Item name={FORM_ITEM_NAMES.path} className={'span-2'} label={t('path')} rules={[rule]}>
              <Input
                maxLength={MAX_LENGTH_INPUT}
                disabled={routeDetails?.isServiceInSso}
                placeholder={t('placeholders.path')}
              />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.host} className={'span-2'} label={t('host')} rules={[rule]}>
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholders.host')} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('buttons.cancel')}
        </ReturnButton>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('buttons.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditRouteContainer>
  );
};

export default EditRoute;
