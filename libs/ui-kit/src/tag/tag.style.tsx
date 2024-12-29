import styled, { css } from 'styled-components';
import { Tag as AntTag } from 'antd';
import { TypeValueType } from './tag';

// Helper function to determine styles based on `type`
const getTagStyles = (type: TypeValueType, theme: any) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: theme.secondary._50,
        color: theme.secondary.main,
        border: theme.secondary.main,
      };
    case 'processing':
      return {
        backgroundColor: theme.primary._50,
        color: theme.primary.main,
        border: 'transparent',
      };
    case 'error':
      return {
        backgroundColor: theme.error._100,
        color: theme.error.main,
        border: 'transparent',
      };
    case 'warning':
      return {
        backgroundColor: theme.warning._100,
        color: theme.warning.main,
        border: 'transparent',
      };
    default:
      return {
        backgroundColor: theme.border._100,
        color: theme.border.main,
        border: 'transparent',
      };
  }
};

export const Tag = styled(AntTag)<{ type?: TypeValueType; bordered?: boolean }>`
  width: max-content;
  height: max-content;
  display: flex;
  align-items: center;

  ${({ type, theme }) =>
    type &&
    css`
      ${() => {
        const { backgroundColor, color, border } = getTagStyles(type, theme);
        return `
          background-color: ${backgroundColor};
          color: ${color};
          border-color: ${border};
        `;
      }}
    `}
`;

export const TagText = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
`;
