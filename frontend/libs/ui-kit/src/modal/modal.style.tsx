import styled from 'styled-components';
import { Modal as AntModal } from 'antd';
import { css } from 'styled-components';

// const headerLineStyle = css`
//   .ant-modal-title::after {
//     content: '';
//     display: block;
//     width: 100%;
//     height: 0.1rem;
//     margin-top: 1.6rem;
//     background-color: ${(props) => props.theme.border._300};
//   }
// `;

export const StyledModal = styled<any>(AntModal)`
  .ant-modal-close {
    top: 1.5rem;
  }

  .ant-modal-header {
    margin: 0;
    padding-inline-start: 0.8rem;

    .ant-modal-title {
      font-weight: 700;
      font-size: 1.8rem;
    }
  }

  .ant-modal-body {
    margin: 2rem 0rem;
  }

  .ant-modal-footer .ant-btn {
    margin-left: 1.6rem;
  }
`;
