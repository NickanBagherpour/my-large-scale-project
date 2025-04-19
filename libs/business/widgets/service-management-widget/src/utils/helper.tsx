import { SERVICE_MANAGEMENT_STATUS } from '../context/types';

import { updateStatus } from '../context';

import * as S from '../components/filters/filters.style';

export const getChipProps = (statusArray: SERVICE_MANAGEMENT_STATUS, chipStatus: SERVICE_MANAGEMENT_STATUS) => {
  const isActive = Array.isArray(chipStatus)
    ? chipStatus.every((status) => statusArray.includes(status))
    : statusArray.includes(chipStatus);
  return isActive ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const) : ({ type: 'unActive' } as const);
};
export const renderChips = (status: SERVICE_MANAGEMENT_STATUS, dispatch: any, t: any) => {
  const businessChips = [
    { key: SERVICE_MANAGEMENT_STATUS.COMMERCIAL, label: t('chips.commercial') },
    { key: SERVICE_MANAGEMENT_STATUS.NONCOMMERCIAL, label: t('chips.noncommercial') },
  ];

  return (
    <S.Chips>
      <S.Chip
        {...getChipProps(status, SERVICE_MANAGEMENT_STATUS.ALL)}
        onClick={() => updateStatus(dispatch, SERVICE_MANAGEMENT_STATUS.ALL)}
      >
        {t('chips.all_status')}
      </S.Chip>

      <S.Divider type='vertical' />

      {businessChips.map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
