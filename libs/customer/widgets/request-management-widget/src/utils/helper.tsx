import { ALL_STATUS_LIST, CUSTOMER_STATUS_LIST } from './consts';

import { Status } from '../types/common-types';

import { updateStatus } from '../context';

import * as S from '..//components/filter/filter.style';

export const getChipProps = (statusArray: Status[], chipStatus: Status | Status[]) => {
  const isActive = Array.isArray(chipStatus)
    ? chipStatus.every((status) => statusArray.includes(status))
    : statusArray.includes(chipStatus);
  return isActive ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const) : ({ type: 'unActive' } as const);
};

export const renderChips = (status: Status, dispatch: any, t: any) => {
  const ALL_STATUS = ALL_STATUS_LIST;

  const customerChips = [
    { key: CUSTOMER_STATUS_LIST.APPROVED, label: t('chips.approval') },
    { key: CUSTOMER_STATUS_LIST.REJECTED, label: t('chips.rejected') },
    { key: CUSTOMER_STATUS_LIST.UNDER_REVIEW, label: t('chips.pending') },
  ];

  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatus(dispatch, ALL_STATUS)}>
        {t('chips.all_requests')}
      </S.Chip>

      <S.Divider type='vertical' />

      {customerChips.map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
