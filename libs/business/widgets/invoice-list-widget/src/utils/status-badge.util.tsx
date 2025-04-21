import { TFunction } from 'i18next';

import { UserRole } from '@oxygen/types';
import { Icons } from '@oxygen/ui-kit';

import { BillingIssueStatus } from './consts';
import { CodeTitle } from '../types';

import * as S from '../components/data-table/data-table.style';

export const statusBadgeRenderer = (status: CodeTitle, billStatus: string, t: TFunction, isDeleted) => {
  const isBUSINESS_ADMIN = billStatus === UserRole.BUSINESS_ADMIN;

  const statusCode = status?.code;
  const statusTitle = status?.title;

  if (isDeleted) {
    return (
      <S.StyledContainer>
        <S.Tag type={'error'}>{t('table.is_deleted')}</S.Tag>
      </S.StyledContainer>
    );
  }
  switch (statusCode) {
    case BillingIssueStatus.OPERATION_ISSUED:
      return (
        <S.StyledContainer>
          {!isBUSINESS_ADMIN && <Icons.InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'processing'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case BillingIssueStatus.COMMERCIAL_BANK_ISSUED:
      return (
        <S.StyledContainer>
          {isBUSINESS_ADMIN && <Icons.InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'processing'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case BillingIssueStatus.ISSUED:
      return (
        <S.StyledContainer>
          <S.Tag type={'initialApproval'}>{statusTitle}</S.Tag>
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
