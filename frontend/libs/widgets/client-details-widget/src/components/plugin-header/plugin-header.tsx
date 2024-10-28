import { useTr } from '@oxygen/translation';
import * as S from './plugin-header.style';
import { Button } from '@oxygen/ui-kit';
import { useToggle } from '@oxygen/hooks';
import LimitationsModal from '../limitations-modal/limitations-modal';

export default function PluginHeader() {
  const [t] = useTr();
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  return (
    <>
      <S.Header>
        <S.Actions>
          <S.Title>{t('app_plugins_for_each_service')}</S.Title>
          <Button color='secondary' variant='link' onClick={toggleModalOpen}>
            <S.SettingsIcon className='icon-setting-linear' />
            {t('add_limits_for_services')}
          </Button>
        </S.Actions>
        <S.Input placeholder={t('search_by_service_name')} prefix={<i className='icon-search-normal' />} />
      </S.Header>

      <LimitationsModal toggle={toggleModalOpen} isOpen={isModalOpen} />
    </>
  );
}
