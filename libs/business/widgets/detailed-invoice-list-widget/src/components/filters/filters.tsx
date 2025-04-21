import { Chip } from '@oxygen/ui-kit';
import * as S from './filters.style';
import { useTr } from '@oxygen/translation';
import {
  updateClientTypeAction,
  updateSearchTermAction,
  updateSortAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import type { ClientType, Sort } from '../../context/types';
import { useState } from 'react';
import { useBounce } from '@oxygen/hooks';

const getChipProps = (currentStatus: ClientType, chipStatus: ClientType) =>
  currentStatus === chipStatus
    ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const)
    : ({ type: 'unActive' } as const);

export default function Filters() {
  const [t] = useTr();
  const { clientType, sort } = useAppState();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useBounce(() => {
    updateSearchTermAction(dispatch, searchTerm.trim());
  }, [searchTerm.trim()]);

  return (
    <>
      <S.Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t('search_by_aggregator_or_client')}
        prefix={<i className='icon-search-normal' />}
      />

      <S.Row>
        <S.Chips>
          <Chip {...getChipProps(clientType, 'all')} onClick={() => updateClientTypeAction(dispatch, 'all')}>
            {t('all')}
          </Chip>

          <S.Divider type='vertical' />

          <Chip
            {...getChipProps(clientType, 'aggregator')}
            onClick={() => updateClientTypeAction(dispatch, 'aggregator')}
          >
            {t('aggregator')}
          </Chip>

          <Chip {...getChipProps(clientType, 'client')} onClick={() => updateClientTypeAction(dispatch, 'client')}>
            {t('client')}
          </Chip>
        </S.Chips>

        <S.FilterPopover
          filters={[
            { key: 'newest', title: t('newest'), icon: 'icon-arrow-ascending' },
            { key: 'oldest', title: t('oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(sort) => updateSortAction(dispatch, sort as Sort)}
        />
      </S.Row>
    </>
  );
}
