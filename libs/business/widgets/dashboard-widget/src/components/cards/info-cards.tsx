import { Flex } from 'antd';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { DashboardCard, InnerDetailCard } from '@oxygen/reusable-components';
import { TextPalette } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { useGetReportCardsDataQuery } from '../../services/get-report-cards.api';
import * as S from './info-cards.style';

// Define TypeScript types for clarity
interface Detail {
  title: string;
  desc: string;
}

interface CardItem {
  title: string;
  icon: string;
  iconColor?: string;
  code?: number;
  link?: string;
  linkText?: string;
  color?: keyof TextPalette;
  detail?: Detail; // If present, it's a detail card
}

const InfoCards: React.FC = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const { data } = useGetReportCardsDataQuery();
  if (!data?.response) return null;
  const { serviceReport, clientReport, mostValuedService, mostFinancialConsumer, mostValuedConsumer } = data.response;
  const cardList: CardItem[] = [
    {
      title: t('service_total'),
      code: serviceReport?.totalCount ?? 0,
      link: ROUTES.BUSINESS.SERVICES_REPORT,
      color: 'secondary',
      icon: 'icon-cloud',
      iconColor: theme.secondary.main,
      linkText: t('service_list_link'),
    },
    {
      title: t('customer_total'),
      code: clientReport?.totalCount ?? 0,
      link: ROUTES.BUSINESS.CLIENTS_REPORT,
      color: 'primary',
      iconColor: theme.primary.main,
      icon: 'icon-buliding',
      linkText: t('customer_list_link'),
    },
    {
      icon: 'icon-max-service-call',
      title: t('customer_with_most_service_call'),
      detail: {
        title: getValueOrDash(mostValuedConsumer?.name),
        desc: getValueOrDash(mostValuedConsumer?.persianName),
      },
      iconColor: theme.primary.main,
    },
    {
      icon: 'icon-trend-up',
      title: t('most_called_service'),
      detail: { title: getValueOrDash(mostValuedService?.name), desc: getValueOrDash(mostValuedService?.persianName) },
      iconColor: theme.info.main,
    },
    {
      icon: 'icon-trend-down',
      title: t('customer_with_most_transactions'),
      detail: {
        title: getValueOrDash(mostFinancialConsumer?.name),
        desc: getValueOrDash(mostFinancialConsumer?.persianName),
      },
      iconColor: theme.warning.main,
    },
  ];

  // Separate the first two cards (which need to be in a Flex container)
  const mainCards = cardList.slice(0, 2);
  const detailCards = cardList.slice(2);

  return (
    <S.Container>
      {/* First two cards inside Flex */}
      <Flex gap={12} vertical justify='space-between'>
        {mainCards.map(({ title, icon, code, link, linkText, color, iconColor }) => (
          <DashboardCard
            iconColor={iconColor}
            key={title}
            headerTitle={title}
            backgroundColor={color}
            cardNumber={code}
            icon={icon}
            linkHref={link}
            linkText={linkText}
          />
        ))}
      </Flex>

      {/* Remaining cards rendered separately */}
      {detailCards.map(({ title, icon, detail, iconColor }) => (
        <DashboardCard key={title} iconColor={iconColor} headerTitle={title} icon={icon}>
          {detail && <InnerDetailCard title={detail.title} description={detail.desc} />}
        </DashboardCard>
      ))}
    </S.Container>
  );
};

export default InfoCards;
