import { useTr } from '@oxygen/translation';
import * as S from './why.style';
import WhyCard from '../why-card/why-card';
import { SectionTitle } from '../section-title/section-title.style';

export default function Why() {
  const [t] = useTr();

  return (
    <S.Container>
      <SectionTitle>{t('why_oxygen')}</SectionTitle>
      <S.Cards>
        <WhyCard
          iconClassName='icon-monitor'
          title={t('for_service_providers')}
          description={t('for_service_providers_desc')}
        />
        <WhyCard iconClassName='icon-code' title={t('for_developers')} description={t('for_service_providers_desc')} />
        <WhyCard iconClassName='icon-bills' title={t('for_businesses')} description={t('for_service_providers_desc')} />
      </S.Cards>
    </S.Container>
  );
}
