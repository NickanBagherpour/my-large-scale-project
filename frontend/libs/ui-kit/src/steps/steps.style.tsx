import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';

export const SwitchWrapper = styled.div`
  .ant-steps {
    border: 1px solid ${(p) => p.theme.border};
    border-radius: var(${cssVar.radius});
    padding: 2.4rem 4.8rem;
  }

  .ant-steps-item-title {
    font-size: 1.4rem;
    font-weight: normal;
    color: ${(p) => p.theme.textPrimary};
  }

  .ant-steps-item-title:after {
    background-color: ${(p) => p.theme.border} !important;
  }
`;
