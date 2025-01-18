import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { AddUpstreamModal } from '@oxygen/reusable-components';

import { updateMessageAction, updatePagination, updateSearchTermAction, useAppDispatch } from '../../context';
import { useCreateUpstreamMutation } from '../../services/create-upstream.api';

import * as S from './filters.style';

export default function Filters() {
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useBounce(() => {
    updateSearchTermAction(dispatch, value);
    updatePagination(dispatch, { page: 1 });
  }, [value]);

  const { mutate, status } = useCreateUpstreamMutation();

  const handleCreateUpstream = async (values) => {
    try {
      const params = {
        name: values.name,
        description: values.description,
      };

      mutate(params, {
        onSuccess: () => {
          setOpenModal(false);
          updateMessageAction(dispatch, {
            description: t('create_upstream_success'),
            type: 'success',
            shouldTranslate: false,
          });
          queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_LIST.GET_LIST] });
        },
      });
    } catch (error) {
      // console.error('Validation failed:', error);
    }
  };

  return (
    <>
      <S.Container>
        <S.StyledText>{t('search')}</S.StyledText>
        <S.Actions>
          <S.StyledInput
            value={value}
            placeholder={t('search_by_name')}
            prefix={<i className='icon-search-normal' />}
            onChange={(e) => setValue(e.target.value)}
          />

          <S.Buttons>
            <S.StyledButton onClick={() => setOpenModal(!openModal)} color='primary' variant='solid'>
              {t('create_new_upstream')}
            </S.StyledButton>
          </S.Buttons>
        </S.Actions>
      </S.Container>
      <AddUpstreamModal
        title={t('create_new_upstream')}
        open={openModal}
        setOpen={setOpenModal}
        onConfirm={handleCreateUpstream}
        status={status}
      />
    </>
  );
}
