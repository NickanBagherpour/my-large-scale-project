import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';

import {
  ALL_STATUS_LIST,
  BUSINESS_STATUS_LIST,
  BusinessUserRole,
  COMMERCIAL_STATUS_LIST,
  SORT_ORDER,
} from '../../utils/consts';

import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';

import * as S from './filter.style';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

type FilterProps = PageProps & {
  userRole: string;
};

const getChipProps = (currentStatus: Status, chipStatus: Status) =>
  currentStatus === chipStatus
    ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const)
    : ({ type: 'unActive' } as const);

const renderChips = (userRole: string, status: Status, dispatch: any, t: any) => {
  const isCommercialAdmin = userRole === BusinessUserRole.BUSINESS_ADMIN;
  const ALL_STATUS = null;
  const businessChips = [
    { key: BUSINESS_STATUS_LIST.APPROVED, label: t('chips.initial_approval') },
    { key: BUSINESS_STATUS_LIST.REJECTED, label: t('chips.rejected') },
    { key: BUSINESS_STATUS_LIST.UNDER_REVIEW, label: t('chips.pending') },
  ];
  const commercialChips = [
    { key: COMMERCIAL_STATUS_LIST.APPROVED, label: t('chips.final_approval') },
    { key: COMMERCIAL_STATUS_LIST.INITIAL_APPROVED, label: t('chips.initial_approval') },
    { key: COMMERCIAL_STATUS_LIST.REJECTED, label: t('chips.rejected') },
    { key: COMMERCIAL_STATUS_LIST.UNDER_REVIEW, label: t('chips.pending') },
  ];

  return (
    <S.Chips>
      <Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatus(dispatch, ALL_STATUS)}>
        {t('chips.all_clients')}
      </Chip>

      <S.Divider type='vertical' />

      {(isCommercialAdmin ? commercialChips : businessChips).map(({ key, label }) => (
        <Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </Chip>
      ))}
    </S.Chips>
  );
};

const Filters: React.FC<FilterProps> = (props) => {
  const { userRole } = props;
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
          placeholder={t('search_by_client_name')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
        />
      </S.Actions>

      <S.Indicators>
        {renderChips(userRole, status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(value) => updateSort(dispatch, value as Sort)}
        />
      </S.Indicators>
    </S.Container>
  );
};

export default Filters;
