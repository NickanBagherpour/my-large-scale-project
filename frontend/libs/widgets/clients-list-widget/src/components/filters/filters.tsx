import { useTr } from '@oxygen/translation';
import { Button, Chip } from '@oxygen/ui-kit';
import * as S from './filters.sytle';

export default function Filters() {
  const [t] = useTr();

  return (
    <S.Container>
      <S.Actions>
        <S.Input prefix={<i className='icon-search-normal' />} placeholder={t('search_by_name_or_id')} />

        <Button color='primary' variant='outlined'>
          {t('upload_client')}
        </Button>
        <Button color='primary' variant='solid'>
          {t('create_new_client')}
        </Button>
      </S.Actions>

      <div>
        <Chip type='active' iconProp='checked icon-checkmark'>
          {t('all_clients')}
        </Chip>

        <Chip type='unActive'>{t('active_clients')}</Chip>

        <Chip type='unActive'>{t('inactive_clients')}</Chip>
      </div>
    </S.Container>
  );
}
