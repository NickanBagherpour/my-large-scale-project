import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';
import { TFunction } from 'i18next';
import * as S from '../components/data-table/data-table.style';

export const statusBadgeRenderer = (status: string, clientStatus: string, t: TFunction) => {
  switch (status) {
    case 'pending':
      return (
        <S.StyledContainer color={'info'}>
          {clientStatus === 'commercialBanking' && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <span className={'label'}>{t('chips.pending')}</span>
        </S.StyledContainer>
      );
    case 'rejected':
      return (
        <S.StyledContainer color={'error'}>
          <span className={'label'}>{t('chips.rejected')}</span>
        </S.StyledContainer>
      );
    case 'initial_approval':
      return (
        <S.StyledContainer color={'success'}>
          {clientStatus === 'Business' && <InactiveBadge width={'1.2rem'} height={'1.2rem'} />}
          <span className={'label'}>{t('chips.initial_approval')}</span>
        </S.StyledContainer>
      );
    case 'final_approval':
      return (
        <S.StyledContainer color={'secondary'}>
          <span className={'label'}>
            <i className={'icon-tick-circle-outlined'} />
            {t('chips.final_approval')}
          </span>
        </S.StyledContainer>
      );
  }
};
