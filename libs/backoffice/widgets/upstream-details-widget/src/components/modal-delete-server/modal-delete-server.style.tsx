import { Modal, MarkText } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const ModalContainer = styled(Modal)`
  /* display: flex;
  justify-content: center; */
  /* & .ant-divider-horizontal {
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
  } */
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  line-height: 2.5rem;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.6rem;

  .delete-modal {
    background-color: red;
  }

  .ant-modal-title {
    font-weight: 700;
  }
`;

export const ServiceName = styled(MarkText)`
  margin: 0.4rem;
`;

export const TableContainer = styled.div`
  margin-bottom: 3rem;

  div.ant-table {
    min-height: fit-content;
  }
`;

// export const IconWrapper = styled.span`
//   display: inline-flex;
//   align-items: center;
//   /* color: ${(p) => p.theme.border.main}; */

//   svg {
//     width: 7.5;
//     height: 7.5;
//     fill: none;
//     /* stroke: ${(p) => p.theme.border.main}; */
//   }
// `;

// export const Info = styled.div`
//   display: flex;

//   span {
//     font-size: 1.6rem;
//     line-height: 2.5rem;
//     font-weight: 500;
//     /* margin-left: 0.8rem; */
//   }
// `;

// export const FollowCode = styled.div`
//   font-size: 1.6rem;
//   line-height: 2.5rem;
//   font-weight: 500;
//   color: ${(p) => p.theme.text.tertiary};
//   margin-top: 2.4rem;
// `;

// export const ReturnToRequest = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: ${(p) => p.theme.primary._600};
//   margin-top: 3.8rem;
//   span {
//     font-size: 1.6rem;
//     line-height: 2.5rem;
//     font-weight: 500;
//     margin-left: 0.8rem;
//   }
//   .icon-home {
//     font-size: 1.8rem;
//   }

//   a {
//     color: ${(p) => p.theme.primary._600} !important;
//     margin-left: 0.6rem;
//   }
// `;

// export const ButtonContainer = styled.div`
//   margin-top: 2.4rem;
//   gap: 0.8rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;
