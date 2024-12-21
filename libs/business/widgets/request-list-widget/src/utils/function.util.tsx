import styled, { css } from 'styled-components';
import { InactiveBadge } from '../../../../../ui-kit/src/assets/icons';

export const generateColor = (item) => {
  switch (item) {
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

const switchBusiness = (status, clientStatus) => {
  switch (status) {
    case 'pending':
      return (
        <StyledContainer color={'info'}>
          {clientStatus === 'bank' && <InactiveBadge />}
          <span className={'label'}>در انتظار تایید</span>
        </StyledContainer>
      );
    case 'rejected':
      return (
        <StyledContainer color={'error'}>
          <span className={'label'}>رد شده</span>
        </StyledContainer>
      );
    case 'confirmed':
      return (
        <StyledContainer color={'success'}>
          {clientStatus === 'kasb' && <InactiveBadge />}
          <span className={'label'}>تایید اولیه</span>
        </StyledContainer>
      );
    case 'registered':
      return (
        <StyledContainer color={'secondary'}>
          <span className={'label'}>
            <i className={'icon-tick-circle-outlined'} />
            تایید نهایی
          </span>
        </StyledContainer>
      );
  }
};

const StyledContainer = styled.span<{ color: 'info' | 'error' | 'success' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  .label {
    ${(p) => generateColor(p.color)};
    padding: 0 0.8rem;
    height: 2rem;
    border-radius: 0.4rem;
  }

  i {
    margin: 0 0.4rem;
  }
`;

export const switchStatus = (status: string, clientStatus: string) => {
  return switchBusiness(status, clientStatus);
};
