import { TFunction } from 'i18next';

import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';
import { BusinessStatusBadge, BusinessUserRole } from './consts';

import * as S from '../components/data-table/data-table.style';

export const statusBadgeRenderer = (status: { code: number; title: string }, clientStatus: string, t: TFunction) => {
  const isCommercialBanking = clientStatus === BusinessUserRole.BUSINESS_ADMIN;

  const statusCode = status?.code;
  const statusTitle = status?.title;

  switch (statusCode) {
    case BusinessStatusBadge.UNDER_REVIEW_COMMERCIAL_BANK:
    case BusinessStatusBadge.UNDER_REVIEW_BUSINESS_UNIT:
      return (
        <S.StyledContainer>
          {!isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'processing'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case BusinessStatusBadge.REJECTED_BY_BUSINESS_UNIT:
    case BusinessStatusBadge.REJECTED_BY_COMMERCIAL_BANK:
      return (
        <S.StyledContainer>
          <S.Tag type={'error'}>{statusTitle}</S.Tag>
        </S.StyledContainer>
      );
    case BusinessStatusBadge.APPROVED_BY_COMMERCIAL_BANK:
      return (
        <S.StyledContainer>
          {isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <S.Tag type={'initialApproval'} bordered={true}>
            {statusTitle}
          </S.Tag>
        </S.StyledContainer>
      );
    case BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT:
      return (
        <S.StyledContainer>
          <S.Tag type={'finalApproval'} icon={<i className={'icon-tick-circle-outlined'} />}>
            {statusTitle}
          </S.Tag>
        </S.StyledContainer>
      );
  }
};
