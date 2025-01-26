import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from 'antd';

import { ROUTES, RQKEYS } from '@oxygen/utils';
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

import * as S from './filters.style';

export default function Filters() {
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const state = useAppState();
  const [value, setValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  useBounce(() => {
    updateSearchTermAction(dispatch, value.trim());
    updatePagination(dispatch, { page: 1 });
  }, [value]);

  const { mutate, status, error } = useCreateUpstreamMutation();

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
  // console.log('description:',t(state.message?.description));
  // console.log('title:',t(state.message?.title));
  return (
    <>
      <S.Container>
        <S.Actions>
          <Form layout={'vertical'}>
            <S.StyledFormItem name={'search_by_name'} label={t('search')}>
              <S.StyledInput
                value={value}
                placeholder={t('search_by_name')}
                prefix={<i className='icon-search-normal' />}
                onChange={(e) => setValue(e.target.value)}
                maxLength={100}
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
          error={error}
        />
      )}
    </>
  );
}
