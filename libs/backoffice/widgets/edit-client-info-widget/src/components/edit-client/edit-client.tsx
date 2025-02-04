import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { useApp } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';
import { Button, Divider, Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { useGetTags } from '../../services/get-tag-info.api';
import { createFormSchema } from '../../types';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { initialValues } from '../../utils/initial-values';
import { GrantValue, TEXT_INPUT_LIMIT } from '../../utils/consts';
import { useGetClientTypes } from '../../services/get-client-types.api';
import { useUpdateClient } from '../../services/post-client.api';
import { getActiveFlow, prepareParams, renderChip } from '../../utils/helper';

import * as S from './edit-client.style';

type FirstStepProps = PageProps & {
  userData: any;
};

const EditClient: React.FC<FirstStepProps> = (props) => {
  const { userData } = props;
  const [t] = useTr();
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const rule = createSchemaFieldRule(createFormSchema(t));

  const [selectedGrantTypes, setSelectedGrantTypes] = useState<any>([]);

  const [selectedTags, setSelectedTags] = useState<any>([]);

  const { notification } = useApp();

  const { data: tags, isFetching: isTagsFetching } = useGetTags();

  const { data: clientTypes, isFetching: isClientTypesFetching } = useGetClientTypes();

  const { mutate, isPending: loadingUpdateClient, isSuccess } = useUpdateClient();

  useEffect(() => {
    if (tags && userData?.tagIds) {
      const selectedTags = tags.filter((tag) => userData?.tagIds?.includes(tag.key)) || [];
      setSelectedTags(selectedTags);
      form.setFieldsValue({
        [FORM_ITEM_NAMES.tags]: selectedTags,
      });
    }
  }, [tags, userData]);

  useEffect(() => {
    const activeFlows = getActiveFlow(userData);
    const foundGrantTypes = GrantValue.filter((item) => activeFlows.includes(item.key));
    setSelectedGrantTypes(foundGrantTypes);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.grantType]: foundGrantTypes,
    });
  }, [userData]);

  const submitClick = () => form.submit();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const onFinish = async (values) => {
    mutate(prepareParams(values), {
      onSuccess: async () => {
        try {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BACKOFFICE.CLIENT_PROFILE, RQKEYS.BACKOFFICE.CLIENT_DETAILS.CLIENT_INFO],
          });

          notification.success({
            message: t('message.success_alert', {
              element: '',
            }),
          });

          await new Promise((resolve) => setTimeout(resolve, 2 * 1000));

          router.back();
        } catch (error) {
          console.error('Error invalidating queries:', error);
        }
      },
      onError: (error) => {
        const errorMessage = error.message || t('unexpected_error');
        notification.error({
          message: t(errorMessage),
        });
      },
    });
  };

  const onGrantTypeChange = (value) => {
    setSelectedGrantTypes(value);
  };

  const onTagsChange = (value) => {
    setSelectedTags(value);
  };

  const onGrantTypeClose = (item) => {
    if (loadingUpdateClient || isSuccess) {
      return;
    }

    const updatedGrantTypes = selectedGrantTypes.filter((grantType: any) => grantType.key !== item);

    setSelectedGrantTypes(updatedGrantTypes);

    form.setFieldsValue({
      [FORM_ITEM_NAMES.grantType]: updatedGrantTypes,
    });
  };

  const onTagsClose = (option) => {
    if (loadingUpdateClient || isSuccess) {
      return;
    }

    const updatedTags = selectedTags.filter((tag: any) => tag.key !== option);
    setSelectedTags(updatedTags);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.tags]: updatedTags,
    });
  };

  return (
    <S.EditClientContainer>
      <div className={'form-wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <S.Form
          layout={'vertical'}
          key={userData?.id}
          onFinish={onFinish}
          form={form}
          initialValues={initialValues(userData)}
          disabled={loadingUpdateClient || isSuccess}
        >
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.latinNameClient} label={t('form.latin_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.latin_name_client')} maxLength={TEXT_INPUT_LIMIT} disabled />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.persianNameClient} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={t('placeholder.client_bale')} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientId} label={t('form.client_id')}>
              <Input placeholder={t('placeholder.client_id')} maxLength={TEXT_INPUT_LIMIT} disabled />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.clientType} rules={[rule]} label={t('form.client_type')}>
              <Select
                disabled={loadingUpdateClient || isSuccess}
                loading={isClientTypesFetching}
                size={'large'}
                placeholder={t('placeholder.credit_system')}
                options={clientTypes}
              ></Select>
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.identityAuth} label={t('form.identity_auth')}>
              <Input
                placeholder={t('placeholder.identity_auth')}
                allow={'number'}
                maxLength={TEXT_INPUT_LIMIT}
                disabled
              />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.websiteUrl} label={t('form.website_url')}>
              <Input placeholder={t('placeholder.website_url')} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.inputAddress} label={t('form.input_address')}>
              <Input placeholder={t('placeholder.input_address')} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.returnAddress} label={t('form.return_address')}>
              <Input placeholder={t('placeholder.return_address')} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
          </SearchItemsContainer>

          <Divider />

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM_NAMES.grantType}>
              <S.Select
                disabled={loadingUpdateClient || isSuccess}
                menu={GrantValue}
                multiSelect={true}
                onChange={onGrantTypeChange}
              >
                {t('form.grant_type')}
              </S.Select>
            </Form.Item>
            <div>{selectedGrantTypes.map((tag: any) => renderChip(tag, onGrantTypeClose))}</div>
          </S.TagPicker>

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM_NAMES.tags}>
              <S.Select
                loading={isTagsFetching}
                disabled={loadingUpdateClient || isSuccess}
                menu={tags}
                multiSelect={true}
                onChange={onTagsChange}
              >
                {t('form.add_tags')}
              </S.Select>
            </Form.Item>
            <div>{selectedTags.map((tag: any) => renderChip(tag, onTagsClose))}</div>
          </S.TagPicker>
        </S.Form>
      </div>

      <FooterContainer>
        <ReturnButton
          size={'large'}
          variant={'outlined'}
          onClick={handleReturn}
          disabled={loadingUpdateClient || isSuccess}
        >
          {t('form.return')}
        </ReturnButton>
        <Button htmlType={'submit'} onClick={submitClick} loading={loadingUpdateClient} disabled={isSuccess}>
          {t('form.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditClientContainer>
  );
};

export default EditClient;
