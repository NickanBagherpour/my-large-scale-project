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
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${(p) => p.theme.border.main};

  svg {
    width: 2rem;
    height: 2rem;
    fill: none;
    stroke: ${(p) => p.theme.border.main};
  }
`;

export const Info = styled.div`
  display: flex;
  span {
    font-size: 1.6rem;
    line-height: 2.5rem;
    font-weight: 500;
    margin-left: 0.8rem;
  }
`;

export const FollowCode = styled.div`
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: ${(p) => p.theme.secondary.main};
  margin-top: 1.6rem;
`;

export const ReturnToRequest = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.primary._600};
  margin-top: 3.8rem;
  span {
    font-size: 1.6rem;
    line-height: 2.5rem;
    font-weight: 500;
    margin-left: 0.8rem;
  }
  .icon-home {
    font-size: 1.8rem;
  }

  a {
    color: ${(p) => p.theme.primary._600} !important;
    margin-left: 0.6rem;
  }
`;
