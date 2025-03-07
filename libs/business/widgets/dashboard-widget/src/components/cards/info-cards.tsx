import { Flex } from 'antd';
import { ROUTES } from '@oxygen/utils';
import { DashboardCard, InnerDetailCard } from '@oxygen/reusable-components';
import { TextPalette } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';
import { Container } from '@oxygen/ui-kit';
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
  const theme = useAppTheme();
  const cardList: CardItem[] = [
    {
      title: 'تعداد کل سرویس‌ها',
      code: 365,
      link: ROUTES.BUSINESS.SERVICES_REPORT,
      color: 'secondary',
      icon: 'icon-cloud',
      iconColor: theme.secondary.main,
      linkText: 'مشاهده لیست سرویس‌ها',
    },
    {
      title: 'تعداد کل مشتری‌ها',
      code: 200,
      link: ROUTES.BUSINESS.CLIENTS_REPORT,
      color: 'primary',
      iconColor: theme.primary.main,
      icon: 'icon-buliding',
      linkText: 'مشاهده لیست مشتری‌ها',
    },
    {
      icon: 'icon-max-service-call',
      title: 'مشتری با بیشترین فراخوانی سرویس',
      detail: { title: 'app bale', desc: 'اپلیکیشن پیام‌رسان بله' },
      iconColor: theme.primary.main,
    },
    {
      icon: 'icon-trend-up',
      title: 'سرویس با بیشترین فراخوانی',
      detail: { title: 'samat-lc-gutr-del', desc: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
      iconColor: theme.info.main,
    },
    {
      icon: 'icon-trend-down',
      title: 'مشتری با بیشترین تراکنش مالی',
      detail: { title: 'samat-lc-gutr-del', desc: 'دریافت کد‌های ملی متعلق به یک شماره موبایل' },
      iconColor: theme.warning.main,
    },
  ];

  // Separate the first two cards (which need to be in a Flex container)
  const mainCards = cardList.slice(0, 2);
  const detailCards = cardList.slice(2);

  return (
    <Container fillContainer={false}>
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
    </Container>
  );
};

export default InfoCards;
