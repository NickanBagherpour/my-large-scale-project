import { Divider } from '@oxygen/ui-kit';
import { Skeleton } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SkeletonCard = styled.div`
  display: flex;
`;
export const Title = styled(Skeleton.Button)`
  width: 50% !important;
`;
export const CardDivider = styled(Divider)`
  margin: 0.8rem;
`;
