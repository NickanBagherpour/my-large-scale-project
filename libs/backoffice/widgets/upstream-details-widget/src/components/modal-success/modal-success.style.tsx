import { Modal } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const ModalContainer = styled(Modal)`
  & .ant-divider-horizontal {
    margin: 0;
    border: 0;
  }

  & .ant-modal-footer {
    margin: 0;
  }

  & .ant-modal-body {
    margin: 0;
  }

  & .ant-modal-content {
    padding: 3.2rem;
  }

  & .ant-card {
    background-color: ${(p) => p.theme.background._50};
    display: flex;
    justify-content: center;
    & .ant-card-body div {
      display: flex;
      justify-content: center;
    }
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    width: 7.5;
    height: 7.5;
    fill: none;
  }
`;

export const Info = styled.div`
  display: flex;

  span {
    font-size: 1.6rem;
    line-height: 2.5rem;
    font-weight: 500;
  }
`;

export const FollowCode = styled.div`
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 500;
  color: ${(p) => p.theme.success.main};
  margin-top: 2.4rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 2.4rem;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
