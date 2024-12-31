import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import * as S from './filters.sytle';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';
import { useState } from 'react';
import { useBounce, useToggle } from '@oxygen/hooks';
import { ROUTES } from '@oxygen/utils';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

const getChipProps = (currentStatus: Status, chipStatus: Status) =>
  currentStatus === chipStatus
    ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const)
    : ({ type: 'unActive' } as const);

export default function Filters() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <>
      <S.Container>
        <S.Actions>
          <S.Input
            value={value}
            placeholder={t('search_by_name_or_request_id')}
            prefix={<i className='icon-search-normal' />}
            onChange={(e) => setValue(e.target.value)}
          />

          <S.Buttons>
            <S.Button href={ROUTES.CUSTOMER.REQUEST_REGISTRATION} color='primary' variant='solid'>
              {t('request_registration')}
            </S.Button>
          </S.Buttons>
        </S.Actions>

        {/* <S.Indicators>
          <S.Chips>
            <Chip {...getChipProps(status, 'all')} onClick={() => updateStatus(dispatch, 'all')}>
              {t('all_clients')}
            </Chip>

            <S.Divider type='vertical' />

            <Chip {...getChipProps(status, 'active')} onClick={() => updateStatus(dispatch, 'active')}>
              {t('active_clients')}
            </Chip>

            <Chip {...getChipProps(status, 'unActive')} onClick={() => updateStatus(dispatch, 'unActive')}>
              {t('inactive_clients')}
            </Chip>
          </S.Chips>

          <S.FilterPopover
            filters={[
              { key: 'newest', title: t('newest'), icon: 'icon-arrow-ascending' },
              { key: 'oldest', title: t('oldest'), icon: 'icon-arrow-descending' },
            ]}
            initialValue={sort}
            onChange={(value) => updateSort(dispatch, value as Sort)}
          />
        </S.Indicators> */}
      </S.Container>
    </>
  );
}
