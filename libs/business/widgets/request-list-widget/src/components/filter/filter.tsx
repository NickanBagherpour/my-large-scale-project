import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import { useBounce } from '@oxygen/hooks';

import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';

import * as S from './filter.style';

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
    <S.Container>
      <S.Actions>
        <S.Input
          value={value}
          placeholder={t('search_by_name_or_id')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
        />
      </S.Actions>

      <S.Indicators>
        <S.Chips>
          <Chip {...getChipProps(status, 'all')} onClick={() => updateStatus(dispatch, 'all')}>
            {t('chips.all_clients')}
          </Chip>

          <S.Divider type='vertical' />

          <Chip {...getChipProps(status, 'final_approval')} onClick={() => updateStatus(dispatch, 'final_approval')}>
            {t('chips.final_approval')}
          </Chip>
          <Chip
            {...getChipProps(status, 'initial_approval')}
            onClick={() => updateStatus(dispatch, 'initial_approval')}
          >
            {t('chips.initial_approval')}
          </Chip>
          <Chip {...getChipProps(status, 'rejected')} onClick={() => updateStatus(dispatch, 'rejected')}>
            {t('chips.rejected')}
          </Chip>
          <Chip {...getChipProps(status, 'pending')} onClick={() => updateStatus(dispatch, 'pending')}>
            {t('chips.pending')}
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
      </S.Indicators>
    </S.Container>
  );
}
