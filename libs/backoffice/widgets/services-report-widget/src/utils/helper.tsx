import { ALL_STATUS_LIST, SERVICE_STATUS_LIST } from './consts';
import { Status } from '../types';
import { updateStatus } from '../context';

import * as S from '../components/filter/filter.style';

export const getChipProps = (statusArray: Status[], chipStatus: Status | Status[]) => {
  const isActive = Array.isArray(chipStatus)
    ? chipStatus.every((status) => statusArray.includes(status))
    : statusArray.includes(chipStatus);
  return isActive ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const) : ({ type: 'unActive' } as const);
};

export const renderChips = (status: Status, dispatch: any, t: any) => {
  const ALL_STATUS = ALL_STATUS_LIST;

  const filterChips = [
    { key: SERVICE_STATUS_LIST.OPERATIONAL, label: t('chips.operational') },
    { key: SERVICE_STATUS_LIST.STOPPED, label: t('chips.stopped') },
  ];

  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatus(dispatch, ALL_STATUS)}>
        {t('chips.all_services')}
      </S.Chip>

      <S.Divider type='vertical' />

      {filterChips.map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
