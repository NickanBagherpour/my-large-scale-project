import { useTr } from '@oxygen/translation';

import ReportSection from './report-section';
import ReportSectionSkeleton from './report-section-skeleton';

import * as S from './report-card.style';

// type Props = {};
const ReportCard: React.FC = () => {
  const [t] = useTr();
  const active = 10;
  const inactive = 20;
  const total = 213;
  const loading = false;
  return (
    <S.Container>
      {!loading && (
        <>
          <ReportSection
            active={active}
            inactive={inactive}
            total={total}
            subtitle='شهریور 1404'
            title={t('service_report')}
            color='primary'
            iconClassName={'icon-cloud'}
          />
          <ReportSection
            active={active}
            inactive={inactive}
            total={total}
            subtitle='شهریور 1404'
            title={t('client_report')}
            color='secondary'
            iconClassName={'icon-buliding'}
          />
        </>
      )}
      {loading && (
        <>
          {' '}
          <ReportSectionSkeleton color='primary' />
          <ReportSectionSkeleton color='secondary' />
        </>
      )}
    </S.Container>
  );
};
export default ReportCard;
