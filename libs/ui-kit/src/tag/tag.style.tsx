import styled, { css } from 'styled-components';
import { Tag as AntTag } from 'antd';
import { TypeValueType } from './tag';

export const Tag = styled(AntTag)<{ type?: TypeValueType; bordered?: boolean }>`
  width: max-content;
  height: max-content;

  display: flex;
  align-items: center;

  ${(p) => {
    if (!p.type) return css``;
    let backgroundColor, color, border;

    switch (p.type) {
      case 'initialApproval':
        backgroundColor = p.theme.success._50;
        color = p.theme.success.main;
        break;
      case 'FinalApproval':
        backgroundColor = p.theme.secondary._50;
        color = p.theme.secondary.main;
        if (p.bordered) {
          border = p.theme.secondary.main;
        }
        break;
      case 'processing':
        backgroundColor = p.theme.primary._50;
        color = p.theme.primary.main;
        break;
      case 'error':
        backgroundColor = p.theme.error._100;
        color = p.theme.error.main;
        break;
      case 'warning':
        backgroundColor = p.theme.warning._100;
        color = p.theme.warning.main;
        break;
      default:
        backgroundColor = p.theme.border._100;
        color = p.theme.border.main;
        break;
    }

    return css`
      background-color: ${backgroundColor};
      color: ${color};
      border-color: ${border};
    `;
  }}
`;

export const TagText = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
`;
