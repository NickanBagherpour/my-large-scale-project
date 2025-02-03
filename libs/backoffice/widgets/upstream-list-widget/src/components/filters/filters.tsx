import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';

import { limits, ROUTES, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { AddUpstreamModal } from '@oxygen/reusable-components';

import {
  updateMessageAction,
  updatePagination,
  updateSearchTermAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import { useCreateUpstreamMutation } from '../../services/create-upstream.api';
import { SearchUpstreamSchema, SearchUpstreamType } from '../../types';
import { FILTER_FORM_ITEM_NAMES } from '../../utils/consts';

import * as S from './filters.style';

export default function Filters() {
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const state = useAppState();
  const errorMessage = state.errorMessage?.description;
  const [value, setValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  useBounce(() => {
    updateSearchTermAction(dispatch, value.trim());
    updatePagination(dispatch, { page: 1 });
  }, [value]);

  const [form] = Form.useForm<SearchUpstreamType>();
  const rule = createSchemaFieldRule(SearchUpstreamSchema(t));

  const { mutate, status } = useCreateUpstreamMutation();

  const handleCreateUpstream = async (values) => {
    try {
      const params = {
        name: values.name,
        description: values.description,
      };

      setOpenModal(true);
      mutate(params, {
        onSuccess: () => {
          setOpenModal(false);
          updateMessageAction(dispatch, {
            description: t('create_upstream_success'),
            type: 'success',
            shouldTranslate: false,
          });
          queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.UPSTREAM], refetchType: 'none' });
          router.push(`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${params.name}`);
        },
        onError: (error) => {
          // console.log('error', error);
        },
      });
    } catch (error) {
      // console.error('error:', error);
    }
  };
  return (
    <>
      <S.Container>
        <S.Actions>
          <Form layout={'vertical'} form={form}>
            <S.StyledFormItem name={FILTER_FORM_ITEM_NAMES.search_by_name} label={t('search')} rules={[rule]}>
              <S.StyledInput
                value={value}
                placeholder={t('search_by_name')}
                prefix={<i className='icon-search-normal' />}
                onChange={(e) => setValue(e.target.value)}
                maxLength={limits.UPSTREAM_MAX_LENGTH}
              />
            </S.StyledFormItem>
          </Form>
          <S.StyledButton onClick={() => setOpenModal(true)} color='primary' variant='solid'>
            {t('create_new_upstream')}
          </S.StyledButton>
        </S.Actions>
      </S.Container>
      {openModal && (
        <AddUpstreamModal
          title={t('create_new_upstream')}
          open={openModal}
          setOpen={setOpenModal}
          onConfirm={handleCreateUpstream}
          status={status}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}
