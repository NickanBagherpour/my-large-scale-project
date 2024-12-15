import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const StepsWrapper = styled.div`
  width: 100%;

  .ant-steps {
    padding: 0;
  }
  .ant-steps-item::after {
    display: none;
  }
  .ant-steps-item {
    padding: 2rem;
  }

  /* ${respondTo.down('md')} {
    } */
  .ant-steps-item {
    white-space: normal;
  }

  .ant-steps-item-disabled {
    background: transparent;
  }

  .ant-steps-item-active,
  .ant-steps-item-error,
  .ant-steps-item-finish.ant-steps-item-disabled {
    background-color: ${(p) => p.theme.secondary._50};
  }

  .ant-steps-item-container {
    text-align: center;
    padding-bottom: 0;
  }

  .ant-steps-item::before {
    top: 0;
    bottom: unset;
    height: 3px;
    inset-inline-start: 0;
    width: 100%;
    background-color: ${(p) => p.theme.border._300};
  }
  .ant-steps-item-finish::before {
    background-color: ${(p) => p.theme.secondary.main};
  }
  .ant-steps-item-process::before {
    background-color: ${(p) => p.theme.secondary.main};
  }

  .ant-steps-item-error::before {
    background-color: ${(p) => p.theme.error.main};
  }

  .ant-steps-item-error .ant-steps-item-title {
    position: relative;
    padding-inline-end: 3.6rem;
    color: ${(p) => p.theme.text.primary};
  }

  .ant-steps-item-error .ant-steps-item-title::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 1.2rem;
    height: 1.2rem;
    inset-inline-end: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: ${(p) => p.theme.error.main};
  }

  .ant-steps-item-wait .ant-progress-circle-path,
  .ant-steps-item-wait .ant-progress-circle-trail {
    stroke: ${(p) => p.theme.border.main}!important;
  }
  .ant-steps-item .ant-steps-item-container:hover .ant-steps-item-title {
    color: ${(p) => p.theme.text.primary};
  }
  .ant-steps-item-wait .ant-steps-item-container:hover .ant-steps-item-title {
    color: ${(p) => p.theme.border.main};
  }

  .ant-progress-circle-path {
    stroke: ${(p) => p.theme.secondary.main};
  }

  .ant-progress-circle-trail {
    stroke: ${(p) => p.theme.secondary._200};
  }
`;
