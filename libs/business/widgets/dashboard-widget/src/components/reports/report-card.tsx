import { useTr } from '@oxygen/translation';

import ReportSection from './report-section';
import ReportSectionSkeleton from './report-section-skeleton';

import { ReportCardsResponse } from '../../types/get-report-card.type';
import * as S from './report-card.style';
import { getCurrentMonthAndYear } from '@oxygen/utils';

type Props = {
  loading: boolean;
  data?: ReportCardsResponse;
};
const ReportCard: React.FC<Props> = ({ loading, data }) => {
  const [t] = useTr();
  const serviceData = data?.response?.serviceReport;
  const clientData = data?.response?.clientReport;
  const currentDate = getCurrentMonthAndYear();
  return (
    <S.Container>
      {!loading && (
        <>
          <ReportSection
            active={serviceData?.activeCount}
            inactive={serviceData?.inactiveCount}
            total={serviceData?.totalCount}
            subtitle={currentDate}
            title={t('service_report')}
            color='primary'
            iconClassName={'icon-cloud'}
          />
          <ReportSection
            active={clientData?.activeCount}
            inactive={clientData?.inactiveCount}
            total={clientData?.totalCount}
            subtitle={currentDate}
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
