import { ALL_STATUS_LIST, SERVICE_STATUS_LIST } from './consts';
import { Status } from '../types';
import { updateStatusAction } from '../context';

import * as S from '../components/filter/filter.style';

const getChipProps = (currentStatus: Status, chipStatus: Status) =>
  currentStatus === chipStatus
    ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const)
    : ({ type: 'inActive' } as const);

export const renderChips = (status: Status, dispatch: any, t: any) => {
  const ALL_STATUS = ALL_STATUS_LIST;

  const filterChips = [
    { key: SERVICE_STATUS_LIST.ACTIVE, label: t('chips.operational') },
    { key: SERVICE_STATUS_LIST.INACTIVE, label: t('chips.stopped') },
  ];

  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatusAction(dispatch, ALL_STATUS)}>
        {t('chips.all_services')}
      </S.Chip>

      <S.Divider type='vertical' />

      {filterChips.map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatusAction(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
