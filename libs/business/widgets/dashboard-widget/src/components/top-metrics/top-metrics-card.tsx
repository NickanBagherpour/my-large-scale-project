import { useTr } from '@oxygen/translation';
import { useAppTheme } from '@oxygen/hooks';
import TopMetricsSection from './top-metrics-section';
import * as S from './top-metrics-card.style';
// type Props = {

//   //
// };
const TopMetricsCard: React.FC = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const topMertricItems = [
    {
      icon: 'icon-crown-2',
      title: t('customer_with_most_transactions'),
      name: 'اپلیکیشن پیام‌رسان بله',
      value: '22,230,560,475' + ' IRR',
      color: theme.dashboard.emerald._600,
      backgroundColor: theme.dashboard.emerald._100,
    },
    {
      icon: 'icon-trend-up',
      title: t('customer_with_most_service_call'),
      name: 'سرویس تاکسی اینترنتی تپسی و ی چیز طولانی',
      value: '22,230,560,475' + ' ' + t('service_call'),
      color: theme.dashboard.pink._600,
      backgroundColor: theme.dashboard.pink._100,
    },
    {
      icon: 'icon-trend-up',
      title: t('most_called_service'),
      name: 'سرویس انتقال وجه و استعلام از ثبت احوال اشخاص حقوقی',
      value: '22,230,560,475' + ' ' + t('service_call'),
      color: theme.info._500,
      backgroundColor: theme.dashboard.blue._50,
    },
    {
      icon: 'icon-cup',
      title: t('bank_most_valuable_client'),
      name: 'صبا ایده - فیلیمو',
      value: '22,230,560,475' + ' ' + t('service_call'),
      timeRange: 30,
      color: theme.dashboard.violet._600,
      backgroundColor: theme.dashboard.violet._100,
    },
    {
      icon: 'icon-award',
      title: t('most_valuable_aggrigator'),
      name: ' گروه صنایع گلرنگ',
      value: '22,230,560,475' + ' ' + t('service_call'),
      timeRange: 30,
      color: theme.warning.main,
      backgroundColor: theme.warning._50,
    },
  ];
  return (
    <S.Container>
      {topMertricItems.map((t, index) => (
        <TopMetricsSection {...t} showDivider={index !== topMertricItems.length - 1} />
      ))}
    </S.Container>
  );
};
export default TopMetricsCard;
