import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';

import { Container } from '@oxygen/ui-kit';

export const ItemsContainer = styled(Container)`
  height: 100%;

  /* .ant-pagination {
    margin: 2rem 3rem;
  } */
`;

// export const TableContainer = styled.div`
//   margin-bottom: 3rem;
// `;

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

  .ant-tabs-tab {
    min-width: 148px;
  }
  .icon-export {
    font-size: 3rem !important;
    color: ${(p) => p.theme.text.quaternary};
  }

  .inputs-container {
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
    ${respondTo.down('md')} {
      grid-template-columns: 1fr;
    }
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

export const DataTableContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FilePreview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 3rem;

  .file-container {
    background-color: ${(p) => p.theme.surface};
    border: 1px solid ${(p) => p.theme.border._100};
    border-radius: 20px;
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .file-title {
      display: flex;
      align-items: center;

      .icon-pdf {
        font-size: 2.2rem;
        color: #dc2626;
      }

      p {
        padding: 0.9rem 1rem;
        span {
          color: ${(p) => p.theme.border._500};
          padding: 0 1rem;
          float: right;
          direction: initial;
        }
      }
    }

    .icon-trash {
      font-size: 2.4rem;
      color: ${(p) => p.theme.border._600};
    }
  }
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;

export const Button = styled(KitButton)`
  width: 40px;
  height: 40px;
  padding: 0 !important;
  &&& {
    font-size: 1.4rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    /* width: 100%; */
    justify-content: end;
    padding-left: 2rem;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const TariffContainer = styled(Container)`
  /* min-height: 70vh; */

  h3 {
    margin-bottom: 3rem;
  }
  input {
    margin-top: 1rem;
  }

  .button-container {
    margin-top: 3rem;
    text-align: left;
  }

  button {
    padding: 0 5rem;
  }
`;

export const ScopeList = styled(Container)`
  /* min-height: 70vh; */

  h3 {
    margin-bottom: 3rem;
  }
  input {
    margin-top: 1rem;
  }

  .button-container {
    margin-top: 3rem;
    text-align: right;
  }

  button {
    padding: 0 5rem;
  }
`;

export const UploadContainer = styled(Container)`
  /* min-height: 70vh; */

  .button-container {
    display: flex;
    justify-content: end;
    gap: 1.5rem;
  }

  .file-upload {
    background: ${(p) => p.theme.lightGray};
    border: 1px solid ${(p) => p.theme.border._100};
    margin-top: 3rem;
    padding: 3rem;
    border-radius: 20px;
  }
`;
