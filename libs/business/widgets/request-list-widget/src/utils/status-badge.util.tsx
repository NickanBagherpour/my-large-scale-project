import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';
import { TFunction } from 'i18next';
import { Tag } from '@oxygen/ui-kit';
import * as S from '../components/data-table/data-table.style';
import { BUSINESS_STATUS_LIST, BusinessUserRole, COMMERCIAL_STATUS_LIST } from './consts';

export const statusBadgeRenderer = (status: { code: number; title: string }, clientStatus: string, t: TFunction) => {
  const isCommercialBanking = clientStatus === BusinessUserRole.BUSINESS_ADMIN;

  const statusCode = status?.code;
  const statusTitle = status?.title;

  switch (statusCode) {
    case BUSINESS_STATUS_LIST.UNDER_REVIEW:
    case COMMERCIAL_STATUS_LIST.UNDER_REVIEW:
      return (
        <S.StyledContainer>
          {isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <Tag type={'processing'}>{statusTitle}</Tag>
        </S.StyledContainer>
      );
    case BUSINESS_STATUS_LIST.REJECTED:
    case COMMERCIAL_STATUS_LIST.REJECTED:
      return (
        <S.StyledContainer>
          <Tag type={'error'}>{statusTitle}</Tag>
        </S.StyledContainer>
      );
    case BUSINESS_STATUS_LIST.APPROVED:
    case COMMERCIAL_STATUS_LIST.APPROVED:
      return (
        <S.StyledContainer>
          {!isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <Tag type={'initialApproval'}>{statusTitle}</Tag>
        </S.StyledContainer>
      );
    // case SEARCH_STATUS_LIST.FINAL_APPROVAL:
    //   return (
    //     <S.StyledContainer>
    //       <Tag type={'FinalApproval'} icon={<i className={'icon-tick-circle-outlined'} />}>
    //         {statusTitle}
    //       </Tag>
    //     </S.StyledContainer>
    //   );
  }
};
