import styled from 'styled-components';
import { Space } from 'antd';

export const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.6rem;
  //margin:1rem 0;
`;

export const DropdownContainer = styled.div`
  & .ant-dropdown-menu-root {
    min-width: 30rem;
    max-width: 45rem;
    max-height: 30rem;
  }

  & .ant-dropdown-menu-item {
    padding: 1.2rem 1.6rem 1.2rem 2.4rem;
    border-radius: 0.8rem;

    &:not(:last-child):not(:first-child) {
      margin-bottom: 0.8rem;
    }
  }
  & .ant-dropdown-menu-item-divider {
    background-color: ${(props) => props.theme.border._300};
    margin: 0.8rem 0.4rem;
  }

  & label span:last-of-type {
    font-size: 1.6rem;
    line-height: 2.5rem;
  }

  & .ant-checkbox-inner {
    width: 1.8rem; /* Desired width */
    height: 1.8rem; /* Desired height */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-checkbox-checked .ant-checkbox-inner::after {
    width: 0.5rem; /* Adjust tick size */
    height: 1.2rem; /* Adjust tick size */
  }

  & .ant-checkbox-checked {
    background-color: ${(props) => props.theme.background.main};
  }
`;
export const StyledSpace = styled(Space)`
  display: flex;
  flex-flow: row-reverse;
  gap: 0.8rem;
  align-items: center;
`;
export const ChipsContainer = styled.div`
  & .ant-tag {
    background-color: ${(props) => props.theme.border._50};
    border: 0;
    min-height: 3.7rem;
  }
`;
