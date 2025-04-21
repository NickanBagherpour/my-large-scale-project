import React, { useState } from 'react';

import { BillingRequestModal } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { PageProps, UserRole } from '@oxygen/types';

import { queryClient } from '@oxygen/client';
import { RQKEYS } from '@oxygen/utils';

import { updateMessageAction, updateSearchTerm, updateSort, useAppDispatch, useAppState } from '../../context';
import { useCreateBillingRequestMutation } from '../../services';
import { Sort } from '../../types/common-types';
import { MAX_LENGTH, SORT_ORDER } from '../../utils/consts';
import { renderChips } from '../../utils/helper';

import * as S from './filter.style';

type FilterProps = PageProps & {
  userRole: UserRole;
};

const Filters: React.FC<FilterProps> = (props) => {
  const { userRole } = props;

  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutate, status: createStatus } = useCreateBillingRequestMutation();

  const handleCreateBillingRequest = async (values) => {
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
            description: t('create_bill_request_success'),
            type: 'success',
            shouldTranslate: false,
          });
          queryClient.invalidateQueries({ queryKey: [RQKEYS.BUSINESS.INVOICE_LIST], refetchType: 'none' });
        },
        onError: (error) => {
          // console.log('error', error);
        },
      });
    } catch (error) {
      // console.error('error:', error);
    }
  };

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <S.Container>
      <S.Actions>
        <S.Input
          value={value}
          placeholder={t('search_by_client_aggregator_name')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
          allow={'letter'}
          type='text'
          maxLength={MAX_LENGTH}
        />
        <S.InvoiceRequestButton onClick={() => setOpenModal(true)} color='primary' variant='solid'>
          {t('invoice_issuance_request')}
        </S.InvoiceRequestButton>
      </S.Actions>

      <S.Indicators>
        {renderChips(userRole, status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('filter.newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('filter.oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(value) => {
            console.log('value', value);
            updateSort(dispatch, value as Sort);
          }}
        />
      </S.Indicators>

      {openModal && (
        <BillingRequestModal
          dispatch={dispatch}
          open={openModal}
          setOpen={setOpenModal}
          onConfirm={handleCreateBillingRequest}
          status={createStatus}
        />
      )}
    </S.Container>
  );
};

export default Filters;
