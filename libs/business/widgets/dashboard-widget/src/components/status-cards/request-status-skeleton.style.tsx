import { Skeleton } from 'antd';
import styled, { keyframes } from 'styled-components';

export const Text = styled(Skeleton.Button)`
  width: 80% !important;
`;
export const Container = styled.div`
  margin-top: 2rem;
`;
export const Title = styled(Skeleton.Button)`
  margin-bottom: 0.5rem;
`;
const shimmer = keyframes`
  0% {
    stroke: #f0f0f0;
  }
  50% {
    stroke: #e0e0e0;
  }
  100% {
    stroke: #f0f0f0;
  }
`;

export const StyledSVG = styled.svg`
  width: 15rem;
  height: 15rem;
  margin: 16px;
`;

export const StyledCircle = styled.circle`
  stroke: #f0f0f0;
  stroke-width: 20;
  fill: none;
  stroke-linecap: round;
  animation: ${shimmer} 1.2s infinite ease-in-out;
`;
