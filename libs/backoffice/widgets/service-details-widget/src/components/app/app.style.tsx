import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';

import { Container } from '@oxygen/ui-kit';

export const ItemsContainer = styled(Container)`
  height: 100%;
`;

export const AppContainer = styled(Container)`
  min-height: 100%;

  .service-technical-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.3rem;
    margin-bottom: 1.7rem;

    .btn-group {
      display: flex;
      gap: 1.5rem;
    }
  }
  ${respondTo.down('md')} {
    .service-technical-details {
      display: block;
    }
  }

  .icon-export {
    font-size: 3rem !important;
    color: ${(p) => p.theme.text.quaternary};
  }

  .clients-list h3 {
    margin-bottom: 4rem;
    padding: 0 1rem;
  }

  .files-dragger {
    h3 {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    p {
      margin-top: 0.5rem;
      margin-bottom: 2.5rem;
      color: ${(p) => p.theme.text.quaternary};
    }
  }

  .ant-upload.ant-upload-drag {
    padding: 2rem;
    border: 2px dashed ${(p) => p.theme.primary._400};
    border-radius: 20px;
  }

  .excel-icon {
    background: ${(p) => p.theme.info._50};
    color: ${(p) => p.theme.info.main};
    border-radius: 35px;
    font-size: 2.4rem !important;
  }
  .printer-icon {
    background: ${(p) => p.theme.secondary._50};
    color: ${(p) => p.theme.secondary.main};
    border-radius: 35px;
    font-size: 2.4rem !important;
  }

  .ant-upload-list {
    display: none;
  }
`;
