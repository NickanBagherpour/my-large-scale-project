import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import * as S from './filters.sytle';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

function getChipType(currentStatus: Status, chipStatus: Status) {
  return currentStatus === chipStatus ? 'active' : 'unActive';
}

export default function Filters() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { searchTerm, status, sort } = useAppState();

  return (
    <S.Container>
      <S.Actions>
        <S.Input
          value={searchTerm}
          placeholder={t('search_by_name_or_id')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => updateSearchTerm(dispatch, e.target.value)}
        />

        <S.Buttons>
          <S.Button href='/load-client' color='primary' variant='outlined'>
            {t('upload_client')}
          </S.Button>
          <S.Button href='/create-client' color='primary' variant='solid'>
            {t('create_new_client')}
          </S.Button>
        </S.Buttons>
      </S.Actions>

      <S.Indicators>
        <S.Chips>
          <Chip
            iconProp='checked icon-checkmark'
            type={getChipType(status, 'all')}
            onClick={() => updateStatus(dispatch, 'all')}
          >
            {t('all_clients')}
          </Chip>

          <S.Divider type='vertical' />

          <Chip
            iconProp='checked icon-checkmark'
            type={getChipType(status, 'active')}
            onClick={() => updateStatus(dispatch, 'active')}
          >
            {t('active_clients')}
          </Chip>

          <Chip
            iconProp='checked icon-checkmark'
            type={getChipType(status, 'inactive')}
            onClick={() => updateStatus(dispatch, 'inactive')}
          >
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
      </S.Indicators>
    </S.Container>
  );
}
