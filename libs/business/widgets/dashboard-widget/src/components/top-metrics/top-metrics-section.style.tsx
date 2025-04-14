import { Typography } from 'antd';
import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';

export const Container = styled.div`
  display: grid;
  /* padding: 1.5rem; */
  grid-template-columns: auto 1fr;
  gap: 1rem;
  max-width: 100%;
  width: 100%;
`;
export const IconBackground = styled.div<{ $color: string }>`
  width: 4.2rem;
  height: 4.2rem;
  background-color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(${cssVar.radius});
  flex-shrink: 0;
`;
export const Icon = styled.i<{ $color: string }>`
  font-size: 2rem;
  color: ${(p) => p.$color};
`;
export const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;
export const Title = styled.span<{ $color: string }>`
  font-size: 1.2rem;
  color: ${(p) => p.$color};
`;
export const Name = styled(Typography.Text)`
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const ClientInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
`;

export const Value = styled.div`
  border-radius: 6px;
  background-color: ${(p) => p.theme.background._100};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  flex-shrink: 0;
  flex-direction: column;
  .subtitle {
    font-size: 1rem;
    color: ${(p) => p.theme.text.quaternary};
  }
`;
export const CustomTooltip = styled.div`
  .ant-tooltip-inner {
    border-radius: var(${cssVar.radiusLg}); /* Apply border-radius to the tooltip */
    background-color: ${(p) => p.theme.secondary._50} !important; /* White background */
    padding: 1rem 1.5rem; /* Optional: Add padding for a better look */
    font-size: 1.2rem; /* Optional: Set the font size */
    color: ${(p) => p.theme.text.primary};
    box-shadow: 0px 1px 3px 0px #0000004d;
    box-shadow: 0px 4px 8px 3px #00000026;
  }
`;
