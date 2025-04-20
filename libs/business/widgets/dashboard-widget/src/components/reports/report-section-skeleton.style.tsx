import { cssVar } from '@oxygen/utils';
import { Skeleton } from 'antd';
import styled from 'styled-components';
export const Container = styled.div<{ $color: 'primary' | 'secondary' }>`
  background-color: ${(p) => (p.$color === 'primary' ? p.theme.primary._50 : p.theme.secondary._50)};
  border-radius: var(${cssVar.radiusLg});
  padding: 2rem;
  .ant-skeleton-paragraph li,
  .ant-skeleton-avatar,
  .ant-skeleton-title,
  .ant-skeleton-button {
    background-color: ${(p) => (p.$color === 'primary' ? p.theme.primary._200 : p.theme.secondary._200)};
  }
`;
export const Body = styled.div<{ $color: 'primary' | 'secondary' }>`
  background-color: ${(p) => (p.$color === 'primary' ? p.theme.primary._100 : p.theme.secondary._100)};
  border-radius: var(${cssVar.radiusLg});
  padding: 2rem;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const Title = styled(Skeleton.Button)`
  width: 50% !important;
`;
