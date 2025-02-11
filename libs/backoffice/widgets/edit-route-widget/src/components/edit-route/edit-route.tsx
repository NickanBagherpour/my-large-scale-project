import React, { useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useApp } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { Button, Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { EditRouteFormSchema } from '../../types/setting.schema';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';
import { useGetRouteDetailsQuery, useGetServiceHttpMethod, useGetServiceProtocol } from '../../services';
import { useEditRouteMutation } from '../../services/post-edit-route.api';

import * as S from './edit-route.style';
import { TFunction } from 'i18next';

type EditScopeProps = PageProps & {
  //
};

const EditRoute: React.FC<EditScopeProps> = () => {
  const [t] = useTr();
  const { notification } = useApp();

  const [form] = Form.useForm();
  const rule = createSchemaFieldRule(EditRouteFormSchema(t));
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
    if (routeDetails && serviceHttpMethods && serviceProtocols) {
      form.setFieldsValue({
        [FORM_ITEM_NAMES.method]: routeDetails?.methods[0]?.code,
        [FORM_ITEM_NAMES.protocol]: routeDetails?.protocols[0]?.code,
        [FORM_ITEM_NAMES.path]: routeDetails.paths[0],
        [FORM_ITEM_NAMES.host]: routeDetails.hosts[0],
      });
    }
  }, [routeDetails, serviceHttpMethods, serviceProtocols, form]);

  const methodsSelectOptions = serviceHttpMethods?.map((method) => ({
    label: method.title,
    value: method.code,
  }));

  const protocolsSelectOptions = serviceProtocols?.map((protocol) => ({
    label: protocol.title,
    value: protocol.code,
  }));

  const onFinish = async (values) => {
    const selectedMethod = methodsSelectOptions.find((option) => option.value === values[FORM_ITEM_NAMES.method]);
    const selectedProtocol = protocolsSelectOptions.find((option) => option.value === values[FORM_ITEM_NAMES.protocol]);

    const payload = {
      ...(servicename && { serviceName: servicename }),
      ...(routeDetails.id && { id: routeDetails.id }),
      ...(selectedMethod && {
        methods: [
          {
            code: selectedMethod?.value,
            title: selectedMethod?.label,
          },
        ],
      }),
      ...(selectedProtocol && {
        protocols: [
          {
            code: selectedProtocol?.value,
            title: selectedProtocol?.label,
          },
        ],
      }),
      ...(values[FORM_ITEM_NAMES.path] && { paths: [values[FORM_ITEM_NAMES.path]] }),
      ...(values[FORM_ITEM_NAMES.host] && { hosts: [values[FORM_ITEM_NAMES.host]] }),
    };

    try {
      mutate(payload, {
        onSuccess: () => {
          notification.success({
            message: t('success_notif'),
          });
          setTimeout(() => {
            router.back();
          }, 200); // this prevents rendering notifications twice, don't know why it works
        },
        onError: (error: any) => {
          console.log('Error object:', error);

          const errorMessage = error.response?.data?.message || t('unexpected_error');

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
            <Form.Item
              name={FORM_ITEM_NAMES.method}
              className={'span-2'}
              label={t('method')}
              rules={[
                {
                  required: true,
                  message: t('validation.required'),
                },
              ]}
            >
              <Select options={methodsSelectOptions} placeholder={t('placeholders.method')} size='large' />
            </Form.Item>

            <Form.Item
              name={FORM_ITEM_NAMES.protocol}
              className={'span-2'}
              label={t('protocol')}
              rules={[
                {
                  required: true,
                  message: t('validation.required'),
                },
              ]}
            >
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
