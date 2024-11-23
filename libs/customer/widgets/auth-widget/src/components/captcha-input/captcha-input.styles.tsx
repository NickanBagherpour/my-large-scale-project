import styled from 'styled-components';
import { Input } from '@oxygen/ui-kit';

import { Button as AntButton } from 'antd';

export const KitInput = styled(Input)`
  & .ant-input-suffix {
    margin-right: 0;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
  }
`;

export const RefreshButton = styled(AntButton)`
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  color: inherit; /* Inherit color from parent */

  //cursor: pointer;
  //transition: color 0.3s;

  //&:hover {
  //  color: #40a9ff; /* Change color on hover */
  //}

  svg {
    width: 2.4rem; /* Adjust size as needed */
    height: 2.4rem; /* Adjust size as needed */
    fill: none; /* Ensure no fill if using stroke */
    stroke: currentColor; /* Inherit stroke color */
  }
`;

export const SuffixContainer = styled.span`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 40px;
  margin: 0 1rem;
  object-fit: cover; /* Ensures the image covers the container without distortion */
`;
