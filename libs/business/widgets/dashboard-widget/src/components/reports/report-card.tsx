import { useTr } from '@oxygen/translation';
import ReportSection from './report-section';

import * as S from './report-card.style';

// type Props = {};
const ReportCard: React.FC = () => {
  const [t] = useTr();
  return (
    <S.Container>
      <ReportSection title={t('service_report')} color='primary' iconClassName={'icon-cloud'} />
      <ReportSection title={t('client_report')} color='secondary' iconClassName={'icon-buliding'} />
    </S.Container>
  );
};
export default ReportCard;
