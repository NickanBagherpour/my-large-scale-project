import { useRouter } from 'next/navigation';
import React from 'react';
import { Form } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { useApp } from '@oxygen/hooks';
import { RQKEYS, trimValues } from '@oxygen/utils';
import { Button, Divider, SearchItemsContainer } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { ClientInfoType, clientType, createFormSchema, TagType } from '../../types';
import { initialValues } from '../../utils/initial-values';
import { GrantValue } from '../../utils/consts';

import { useUpdateClient } from '../../services/post-client.api';
import { prepareParams } from '../../utils/helper';
import SearchItems from '../search-items/search-items';
import TagPickerContainer from '../tag-picker/tag-picker';

import * as S from './edit-client.style';

type FirstStepProps = PageProps & {
  userData: ClientInfoType;
  tags: TagType;
  isTagsFetching: boolean;
  clientTypes: clientType;
  isClientTypesFetching: boolean;
};

const EditClient: React.FC<FirstStepProps> = (props) => {
  const { userData, tags, isTagsFetching, clientTypes, isClientTypesFetching } = props;
  const [t] = useTr();
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { notification } = useApp();

  const { mutate, isPending: loadingUpdateClient, isSuccess } = useUpdateClient();

  const rule = createSchemaFieldRule(createFormSchema(t));

  const submitClick = () => form.submit();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const onFinish = async (values) => {
    mutate(prepareParams(trimValues(values), userData?.organizationInfo?.organizationNationalId), {
      onSuccess: async () => {
        try {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BACKOFFICE.CLIENT_PROFILE, RQKEYS.BACKOFFICE.CLIENT_DETAILS.CLIENT_INFO],
          });

          notification.success({
            message: t('message.success_alert', { element: '' }),
          });

          router.back();

          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BACKOFFICE.EDIT_CLIENT_KEYS.CLIENT_INFO],
          });
        } catch (error) {
          // console.error('Error invalidating queries:', error);
        }
      },
    });
  };

  return (
    <S.EditClientContainer>
      <div className={'form-wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <S.Form
          layout={'vertical'}
          key={userData?.clientId}
          onFinish={onFinish}
          form={form}
          initialValues={initialValues(userData)}
          disabled={loadingUpdateClient || isSuccess}
        >
          <SearchItemsContainer>
            <SearchItems
              form={form}
              clientTypes={clientTypes}
              isClientTypesFetching={isClientTypesFetching}
              loadingUpdateClient={loadingUpdateClient}
              isSuccess={isSuccess}
              t={t}
              rule={rule}
            />
          </SearchItemsContainer>

          <Divider />

          <TagPickerContainer
            GrantValue={GrantValue}
            loadingUpdateClient={loadingUpdateClient}
            isSuccess={isSuccess}
            isTagsFetching={isTagsFetching}
            tags={tags}
            t={t}
            form={form}
            rule={rule}
          />
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
