import styled, { css } from 'styled-components';
import { Button as AntButton } from 'antd';
import { cssVar } from '@oxygen/utils';

export const StyledButton = styled<any>(AntButton)`
  > *:first-child {
    margin-left: 0;
  }

  &.ant-btn-lg {
    border-radius: var(${cssVar.radius});
    font-size: 1.6rem;
  }

  &.ant-btn {
    column-gap: 0.8rem;
    ${(p) => getRelatedVariantBackground(p)};
    .ant-btn-icon:not(:last-child) {
      margin-inline-end: 0;
    }
  }
`;

function getRelatedVariantBackground(p: any) {
  const color = p.color;

  switch (p.variant) {
    case 'outlined':
      return css`
        border-color: ${(p) => p.theme[color].main};
        color: ${(p) => p.theme[color].main};
        &:hover {
          opacity: 0.7;
        }
        &:active {
          filter: brightness(0.7);
        }
      `;
    case 'filled':
      return css`
        background-color: ${(p) => p.theme[color]._100};
        color: ${(p) => p.theme[color].main};
        &:hover {
          background-color: ${(p) => p.theme[color]._300}6;
        }
        &:active {
          background-color: ${(p) => p.theme[color]._300};
        }
      `;

    case 'dashed':
      return css`
        border-color: ${(p) => p.theme[color].main};
        border-style: dashed;
        color: ${(p) => p.theme[color].main};
        &:hover {
          opacity: 0.7;
        }
        &:active {
          filter: brightness(0.7);
        }
      `;
    case 'text':
      return css`
        color: ${(p) => p.theme[color].main};
        &:hover {
          background-color: ${(p) => p.theme[color]._50};
        }
        &:active {
          background-color: ${(p) => p.theme[color]._300};
        }
      `;
    case 'link':
      return css`
        color: ${(p) => p.theme[color].main};
        &:hover {
          opacity: 0.8;
        }
        &:active {
          filter: brightness(0.7);
        }
      `;
    default:
      return css`
        background-color: ${(p) => p.theme[color].main};
        color: ${(p) => p.theme.onPrimary};
        &:hover {
          opacity: 0.8;
        }
        &:active {
          filter: brightness(0.85);
        }
      `;
  }
}
