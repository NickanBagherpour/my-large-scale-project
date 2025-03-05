import { Status } from '../types';
import { updateStatusAction } from '../context';

import * as S from '../components/filter/filter.style';

const getChipProps = (currentStatus: Status, chipStatus: Status) => {
  const result =
    currentStatus === chipStatus
      ? ({
          type: 'active',
          iconProp: 'checked icon-checkmark',
        } as const)
      : ({ type: 'unActive' } as const);
  return result;
};
export const renderChips = (status: Status, dispatch: any, t: any) => {
  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, null)} onClick={() => updateStatusAction(dispatch, null)}>
        {t('chips.all_services')}
      </S.Chip>
      <S.Divider type='vertical' />
      <S.Chip {...getChipProps(status, true)} onClick={() => updateStatusAction(dispatch, true)}>
        {t('chips.operational')}
      </S.Chip>
      <S.Chip {...getChipProps(status, false)} onClick={() => updateStatusAction(dispatch, false)}>
        {t('chips.stopped')}
      </S.Chip>
    </S.Chips>
  );
};
