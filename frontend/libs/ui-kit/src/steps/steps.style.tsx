import styled from 'styled-components';

export const StepsWrapper = styled.div`
  width: 100%;

  .ant-steps-item::after {
    display: none;
  }
  .ant-steps-item {
    padding: 2rem;
    background-color: ${(p) => p.theme.secondary._50};
  }
  .ant-steps-item-container {
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
