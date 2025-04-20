import { TFunction } from 'i18next';

import { Icons } from '@oxygen/ui-kit';
import { BusinessUserRole, StatusBadge } from './consts';

import * as S from '../components/data-table/data-table.style';

export const statusBadgeRenderer = (status: { code: number; title: string }, clientStatus: string, t: TFunction) => {
  const isBUSINESS_ADMIN = clientStatus === BusinessUserRole.BUSINESS_ADMIN;

  const statusCode = status?.code;
  const statusTitle = status?.title;

  switch (statusCode) {
    case StatusBadge.UNDER_REVIEW_COMMERCIAL_BANK:
      return (
        <S.StyledContainer>
          {!isBUSINESS_ADMIN && <Icons.InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'processing'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case StatusBadge.UNDER_REVIEW_BUSINESS_UNIT:
      return (
        <S.StyledContainer>
          {isBUSINESS_ADMIN && <Icons.InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'processing'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case StatusBadge.DELETED:
      return (
        <S.StyledContainer>
          <S.Tag type={'error'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case StatusBadge.ISSUED:
      return (
        <S.StyledContainer>
          <S.Tag type={'initialApproval'} bordered={true}>
            {statusTitle}
          </S.Tag>
        </S.StyledContainer>
      );
    default:
      return (
        <S.StyledContainer>
          <S.Tag type={'default'}>{t('chips.unknown')}</S.Tag>
        </S.StyledContainer>
      );
  }
};
