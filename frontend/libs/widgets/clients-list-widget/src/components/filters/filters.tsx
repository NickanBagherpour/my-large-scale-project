import { useTr } from '@oxygen/translation';
import { Button, Chip } from '@oxygen/ui-kit';
import * as S from './filters.sytle';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { Radio } from 'antd';

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

        <Button color='primary' variant='outlined'>
          {t('upload_client')}
        </Button>
        <Button color='primary' variant='solid'>
          {t('create_new_client')}
        </Button>
      </S.Actions>

      <S.Indicators>
        <Chip
          type={status === 'all' ? 'active' : 'unActive'}
          iconProp='checked icon-checkmark'
          onClick={() => updateStatus(dispatch, 'all')}
        >
          {t('all_clients')}
        </Chip>

        <Chip type={status === 'active' ? 'active' : 'unActive'} onClick={() => updateStatus(dispatch, 'active')}>
          {t('active_clients')}
        </Chip>

        <Chip type={status === 'inactive' ? 'active' : 'unActive'} onClick={() => updateStatus(dispatch, 'inactive')}>
          {t('inactive_clients')}
        </Chip>

        <S.RadioGroup onChange={(e) => updateSort(dispatch, e.target.value)} value={sort}>
          <Radio value='newest'>{t('newest')}</Radio>
          <Radio value='oldest'>{t('oldest')}</Radio>
        </S.RadioGroup>
      </S.Indicators>
    </S.Container>
  );
}
