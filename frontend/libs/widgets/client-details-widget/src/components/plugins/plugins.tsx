import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import * as S from './plugins.style';
import Service from '../service/service';
import { useToggle } from '@oxygen/hooks';
import LimitationsModal from '../limitations-modal/limitations-modal';

export default function Plugins() {
  const [t] = useTr();
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  return (
    <section>
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

      {Array.from({ length: 4 }).map((_, idx) => (
        <Service
          key={idx}
          idx={idx + 1}
          name='دریافت کد‌های ملی متعلق به یک شماره موبایل'
          englishName='Customer-idnumber-phonenumber'
          status='تایید‌ شده'
          version='V2.0'
          scope='svc-mgmt-samat-lc-bal-del'
          upstream='sejam'
        />
      ))}
    </section>
  );
}
