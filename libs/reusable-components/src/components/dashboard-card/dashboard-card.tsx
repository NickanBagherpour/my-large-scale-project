import { ReactElement } from 'react';
import { BasicComponentProps, TextPalette } from '@oxygen/types';
import { Flex } from 'antd';
import * as S from './dashboard-card.style';
type Props = {
  icon?: string;
  iconColor?: string;
  headerTitle: string;
  innerCard?: ReactElement;
  cardNumber?: number;
  backgroundColor?: keyof TextPalette;
  linkHref?: string;
  linkText?: string;
} & BasicComponentProps;
const DashboardCard: React.FC<Props> = ({
  children,
  icon,
  headerTitle,
  iconColor,
  cardNumber,
  backgroundColor,
  linkHref,
  linkText,
}) => {
  const hasNumber = (cardNumber ?? 0) >= 0;
  return (
    <S.CardContainer $backgroundColor={backgroundColor}>
      <S.HeaderContainer>
        <S.LinkHeader>
          <div>
            <S.HeaderIcon className={icon} $iconColor={iconColor} />
            <S.HeaderTitle>
              {headerTitle}
              {hasNumber && linkHref && ': '}
            </S.HeaderTitle>
            {hasNumber && linkHref && <S.Number $color={backgroundColor}>{cardNumber}</S.Number>}
          </div>
          {linkHref && <S.CardLink href={linkHref}>{linkText}</S.CardLink>}
        </S.LinkHeader>
        {hasNumber && !linkHref && <S.Number $color={backgroundColor}>{cardNumber}</S.Number>}
      </S.HeaderContainer>
      {children && <S.ChildrenContainer>{children}</S.ChildrenContainer>}
    </S.CardContainer>
  );
};
export default DashboardCard;
