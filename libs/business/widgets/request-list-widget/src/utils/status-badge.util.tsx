import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';
import { TFunction } from 'i18next';
import { Tag } from '@oxygen/ui-kit';
import * as S from '../components/data-table/data-table.style';

export const statusBadgeRenderer = (status: string, clientStatus: string, t: TFunction) => {
  const isCommercialBanking = clientStatus === 'commercialBanking';

  switch (status) {
    case 'pending':
      return (
        <S.StyledContainer>
          {isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          {/*<Tag type={'processing'}>{isCommercialBanking ? t('chips.pending') : t('chips.pend_bank')}</Tag>*/}
        </S.StyledContainer>
      );
    case 'rejected':
      return <S.StyledContainer>{/*<Tag type={'error'}>{t('chips.rejected')}</Tag>*/}</S.StyledContainer>;
    case 'initial_approval':
      return (
        <S.StyledContainer>
          {!isCommercialBanking && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          {/*<Tag type={'initialApproval'}>{t('chips.initial_approval')}</Tag>*/}
        </S.StyledContainer>
      );
    case 'final_approval':
      return (
        <S.StyledContainer>
          {/*<Tag type={'FinalApproval'} icon={<i className={'icon-tick-circle-outlined'} />}>*/}
          {/*  {t('chips.final_approval')}*/}
          {/*</Tag>*/}
        </S.StyledContainer>
      );
  }
};
