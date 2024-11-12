import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import * as S from './filters.sytle';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';
import { useState } from 'react';
import { useBounce } from '@oxygen/hooks';
import { ROUTES } from '@oxygen/utils';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

function getChipType(currentStatus: Status, chipStatus: Status) {
  return currentStatus === chipStatus ? 'active' : 'unActive';
}

export default function Filters() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');
  console.log('status : ', status);

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <S.Container>
      <S.Actions>
        <S.Input
          value={value}
          placeholder={t('search_by_name_or_scope')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
        />

        <S.Buttons>
          <S.Button href={ROUTES.BACKOFFICE.SERVICE_CREATION} color='primary' variant='outlined'>
            {t('upload_service')}
          </S.Button>
          <S.Button href={ROUTES.BACKOFFICE.SERVICE_CREATION} color='primary' variant='solid'>
            {t('create_new_service')}
          </S.Button>
        </S.Buttons>
      </S.Actions>

      <S.Indicators>
        <S.Chips>
          <Chip
            iconProp={status === 'all' ? 'checked icon-checkmark' : undefined}
            type={getChipType(status, 'all')}
            onClick={() => updateStatus(dispatch, 'all')}
          >
            {t('all_services')}
          </Chip>

          <S.Divider type='vertical' />

          <Chip
            iconProp={status === 'active' ? 'checked icon-checkmark' : undefined}
            type={getChipType(status, 'active')}
            onClick={() => updateStatus(dispatch, 'active')}
          >
            {t('operational_services')}
          </Chip>

          <Chip
            iconProp={status === 'inactive' ? 'checked icon-checkmark' : undefined}
            type={getChipType(status, 'inactive')}
            onClick={() => updateStatus(dispatch, 'inactive')}
          >
            {t('stopped_services')}
          </Chip>
        </S.Chips>

        <S.FilterPopover
          filters={[
            { key: 'newest', title: t('ascending'), icon: 'icon-arrow-ascending' },
            { key: 'oldest', title: t('descending'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(value) => updateSort(dispatch, value as Sort)}
        />
      </S.Indicators>
    </S.Container>
  );
}
