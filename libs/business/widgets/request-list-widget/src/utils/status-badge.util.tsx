import styled, { css } from 'styled-components';
import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';
import { TFunction } from 'i18next';

type colorStatusType = 'info' | 'error' | 'success' | 'secondary';

export const generateColor = (colorStatus: colorStatusType) => {
  switch (colorStatus) {
    case 'info':
      return css`
        background-color: ${(p) => p.theme.info._50};
        color: ${(p) => p.theme.info.main};
      `;
    case 'error':
      return css`
        background-color: ${(p) => p.theme.error._50};
        color: ${(p) => p.theme.error.main};
      `;
    case 'success':
      return css`
        background-color: ${(p) => p.theme.success._50};
        color: ${(p) => p.theme.success.main};
      `;
    case 'secondary':
      return css`
        background-color: ${(p) => p.theme.secondary._50};
        color: ${(p) => p.theme.secondary.main};
        border: 1px solid ${(p) => p.theme.secondary.main};
      `;
  }
};

const StyledContainer = styled.span<{ color: colorStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  .label {
    ${(p) => generateColor(p.color)};
    padding: 0 0.8rem;
    min-height: 2.8rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    margin: 0 0.4rem;
    font-size: 20px;
  }
`;

const switchBusiness = (status: string, clientStatus: string, t: TFunction) => {
  switch (status) {
    case 'pending':
      return (
        <StyledContainer color={'info'}>
          {clientStatus === 'bank' && <InactiveBadge />}
          <span className={'label'}>{t('chips.pending')}</span>
        </StyledContainer>
      );
    case 'rejected':
      return (
        <StyledContainer color={'error'}>
          <span className={'label'}>{t('chips.rejected')}</span>
        </StyledContainer>
      );
    case 'initial_approval':
      return (
        <StyledContainer color={'success'}>
          {clientStatus === 'kasb' && <InactiveBadge />}
          <span className={'label'}>{t('chips.initial_approval')}</span>
        </StyledContainer>
      );
    case 'final_approval':
      return (
        <StyledContainer color={'secondary'}>
          <span className={'label'}>
            <i className={'icon-tick-circle-outlined'} />
            {t('chips.final_approval')}
          </span>
        </StyledContainer>
      );
  }
};

export const switchStatus = (status: string, clientStatus: string, t: TFunction) => {
  return switchBusiness(status, clientStatus, t);
};
